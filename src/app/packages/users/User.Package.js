import Database from "../../../infrastructure/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { get, perishableSet } from "../../../interface/caching";
import Socket from "../../../socket";
import mailgun from "mailgun-js";
const DOMAIN = "sandboxe89ce991eda94ac09b33a9b77e231808.mailgun.org";
const mg = mailgun({
  apiKey: "b72a0f29b241f769729c7596cd7fdeb0-a3c55839-c3c53d4b",
  domain: DOMAIN,
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JwtSecret, {
    expiresIn: maxAge,
  });
};
// for development only
export const getUsers = async () => {
  // try {
  //   const users = await Database.Users.findAll();
  //   //users.forEach(user => console.log(user.name))
  //   //console.log(users)
  //   return (users);
  // } catch (err) {
  //   return ({
  //     status: 400,
  //     message: err.message,
  //   });
  // }
  const poll = await Database.Polls.findOne({ where: { id: 2 } });
  const options = await Database.Option.findAll({
    where: {
      pollId: poll.id,
    },
  });

  //console.log(options)
  let optionObj = [];
  options.forEach((option) => {
    optionObj.push({ votes: option.votes, label: option.option });
  });
  console.log(optionObj);

  // On new client connection
  return Socket.on("connection", (socket) => {
    Socket.emit("update", optionObj);

    // On new vote
    socket.on("vote", (index) => {
      // Increase the vote at index
      if (optionObj[index]) {
        optionObj[index].votes += 1;
      }

      // Show the optionObj in the console for testing
      console.log(optionObj);

      // Tell everybody else about the new vote
      Socket.emit("update", optionObj);
    });
  });
};

export const register = async ({ email, password, ...args }) => {
  try {
    const isUserExist = await Database.Users.findOne({ where: { email } });
    if (isUserExist) {
      return "Already exists!";
    } else {
      const hashedPassword = await bcrypt.hashSync(password, 10);
      const user = await Database.Users.create({
        password: hashedPassword,
        email,
        ...args,
      });
      const { id, name } = user;
      const token = jwt.sign({ id, name }, process.env.JwtSecret);

      return {
        id,
        name,
        token,
      };
    }
  } catch (err) {
    return {
      status: 400,
      message: err.message,
    };
  }
};

export const create = async ({ name, email, password }) => {
  try {
    const userr = await Database.Users.findOne({ where: { email } });
    //console.log(userr.dataValues)
    if (userr) {
      throw new Error("Email already exists");
    } else {
      const token = jwt.sign({ name, email, password }, process.env.JwtSecret, {
        expiresIn: maxAge,
      });

      const emailData = {
        from: "noReply@hello.com",
        to: email,
        subject: "Hello",
        html: `
              <h2>Please click on given link to activate account!</h2>
              <p>${process.env.CLIENT_URL}/activation/authenticate/${token}</p>
              `,
      };
      mg.messages().send(emailData, function (error, body) {
        if (error) {
          return {
            error: error.message,
          };
        }
        const returnData = "Email sent. Please activate";
        console.log(body);
        return { returnData };
      });
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const activateAccount = async ({ token }) => {
  if (token) {
    jwt.verify(token, process.env.JwtSecret, async (err, decodedToken) => {
      if (err) {
        return {
          success: false,
          message: "Failed to authenticate token",
        };
      } else {
        const { name, email, password } = decodedToken;
        //const user = Database.Users.findOne({where:{email}})
        console.log(name);
        console.log(email);
        console.log(password);
        const hashedPassword = await bcrypt.hashSync(password, 10);
        console.log(hashedPassword);
        const user = await Database.Users.create({
          name,
          email,
          password: hashedPassword,
        });
        const token = createToken(user.id, user.email);

        return {
          name,
          email,
          token,
        };
      }
    });
  } else {
    return {
      error: "Something went wrong!",
    };
  }
};

export const login = async ({ email, password }) => {
  try {
    const user = await Database.Users.findOne({
      where: { email },
    });

    //check if user exists
    if (user) {
      //check if password matches
      const validated = await bcrypt.compare(password, user.password);
      //if exists create token and return user(without password and id) and token
      if (validated) {
        const { password, id, ...userData } = user.dataValues;
        const token = createToken(user.id, user.email);
        const data = { token, userData };
        return { data };
      } else {
        throw new Error();
      }
    }
  } catch (err) {
    return { status: 400, message: "Invalid name/Password" };
  }
};

export const changePassword = async ({ oldPassword, newPassword, userId }) => {
  try {
    const user = await Database.Users.findByPk(userId);
    if (!user || !bcrypt.compare(oldPassword, user.password)) {
      console.log("Wrong credentials");
    } else {
      user.password = bcrypt.hashSync(newPassword, 10);
      await user.save();

      const { password, ...other } = user.dataValues;
      const data = other;
      return { data };
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const resetPassword = async ({ email }) => {
  try {
    const user = await Database.Users.findOne({ where: { email } });

    if (!user) {
      throw new Error("Email does not exists");
    } else {
      const OTP = jwt.sign({ id: user.id }, process.env.RESET_PASSWORD_KEY, {
        expiresIn: maxAge,
      });

      await perishableSet(`OTP-${user.id}`, OTP);

      const emailData = {
        from: "noReply@hello.com",
        to: email,
        subject: "Hello",
        html: `
              <h2>Please click on given link to reset your password!</h2>
              <p>${process.env.CLIENT_URL}/resetpassword/${OTP}</p>
              `,
      };
      mg.messages().send(emailData, function (error, body) {
        if (error) {
          return {
            error: error.message,
          };
        }
      });
      const returnData = "Email sent. Reset Password";
      return { returnData };
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const verifyOTP = async ({ email, OTP }) => {
  try {
    const user = await Database.Users.findOne({ where: { email } });

    if (!user) {
      throw new Error("Email does not exists");
    } else {
      const userOTP = await get(`OTP-${user.id}`);

      if (!userOTP || OTP !== userOTP.toString()) {
        throw new Error("Wrong OTP!");
      } else {
        const data = user.dataValues;
        delete data.password;
        return { data };
      }
    }
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};
