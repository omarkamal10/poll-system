import Database from "../../../infrastructure/database";
import { Op } from "sequelize";

export const getPoll = async ({ id }) => {
  try {
    const poll = await Database.Polls.findByPk(id);
    if (!poll) throw new Error("No poll found");
    const { createdAt, updatedAt, ...data } = poll.dataValues;
    return { data };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const getMyPolls = async ({ id }) => {
  try {
    const polls = await Database.Polls.findAll({
      where: { userId: id },
    });
    console.log(polls);

    if (polls.length === 0) {
      throw new Error("User has not created any Polls!");
    }

    const data = polls;
    return { data };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const getUserPollsById = async ({ id: userId }) => {
  try {
    const polls = await Database.Polls.findAll({
      where: {
        userId,
      },
    });
    if (polls.length === 0) {
      throw new Error("User has not created any Polls!");
    }

    const data = polls;
    return { data };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const createPoll = async ({ question, options }, { email }) => {
  try {
    const user = await Database.Users.findOne({ where: { email } });
    if (!user) throw new Error("You must be signed in to create a Poll!");

    const poll = await Database.Polls.create({
      question,
      options: options.map((option) => option),
      userId: user.id,
    });
    options.map(async (option) => {
      await Database.Option.create({
        option,
        votes: 0,
        pollId: poll.id,
      });
    });
    const { createdAt, updatedAt, ...data } = poll.dataValues;
    return { data };
  } catch (err) {
    return {
      status: 400,
      message: err.message,
    };
  }
};

export const votePoll = async ({ id: pollId }, { id: userId }, { answer }) => {
  console.log(answer);
  try {
    if (answer) {
      const poll = await Database.Polls.findByPk(pollId);
      if (!poll) throw new Error("No poll found");

      const option = await Database.Option.findOne({
        where: {
          pollId,
          option: answer,
        },
      });
      //console.log(option.id)

      const voter = await Database.Voted.findOne({
        where: {
          [Op.or]: [
            {
              userId,
              pollId,
            },
            {
              userId,
              optionId: option.id,
            },
          ],
        },
      });
      console.log(voter);
      if (voter) {
        throw new Error("Already voted");
      }

      const voted = await Database.Voted.create({
        userId: userId,
        optionId: option.dataValues.id,
        pollId: pollId,
      });
      console.log(voted);

      option.votes++;
      await option.save();

      const data = {
        poll: poll.question,
        choices: poll.options,
        votedFor: option.option,
      };

      return { data };
    } else {
      throw new Error("No Answer Provided");
    }
  } catch (error) {
    return error;
  }
};

export const getPollResults = async ({ id: pollId }) => {
  try {
    const poll = await Database.Polls.findByPk(pollId);

    const optionsArr = await Database.Option.findAll({
      where: {
        pollId,
      },
    });

    const options = optionsArr.map((option) => ({
      optionName: option.option,
      votesTotal: option.votes,
    }));

    const votersArr = await Database.Voted.findAll({
      where: {
        pollId,
      },
    });

    const voters = votersArr.map((voter) => ({
      voterId: voter.userId,
      votedFor: voter.optionId,
    }));

    const data = {
      question: poll.question,
      optionsWithVotes: options,
      voters: voters,
    };
    return { data };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const getUserVotes = async ({ id: userId }) => {
  try {
    const user = await Database.Users.findAll({
      include: {
        model: Database.Voted,
        as: "Voted",
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
      },
      where: {
        id: userId,
      },
      attributes: { exclude: ["id", "password", "createdAt", "updatedAt"] },
    });
    return { user };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
    };
  }
};

export const voteSocket = async ({ id: pollId }) => {
  //   const poll = await Database.Polls.findOne({where:{id:2}})
  //   const options = await Database.Option.findAll({
  //     where:{
  //       pollId:poll.id
  //     }
  //   })
  //   //console.log(options)
  //   let optionObj = []
  //   let i = 0
  //   options.forEach((option) => {
  //   optionObj.push({"votes":option.votes,"label":option.option})
  // })
  // // On new client connection
  // return io.on("connection", (socket) => {
  //     io.emit("update", optionObj);
  //     // On new vote
  //     socket.on("vote", (index) => {
  //         // Increase the vote at index
  //         if (optionObj[index]) {
  //             optionObj[index].votes += 1;
  //         }
  //         // Show the candidates in the console for testing
  //         console.log(optionObj);
  //         // Tell everybody else about the new vote
  //         io.emit("update", optionObj);
  //     });
  // });
};
