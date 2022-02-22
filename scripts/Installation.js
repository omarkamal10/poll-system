import Database from "../src/database";
// import DummyData from "./DummyData"; // CREATING DUMMY DATA FOR DEVELOPMENT

Database.connection
  .sync({
    force: process.env.NODE_ENV === "Rest", // ENABLED FORCE MODE ON REST
    alter: false, // DISABLED ALTER MODE
  })
  .then(async () => {
    // ==========================================================================
    //                          USERS
    // ==========================================================================
    await Database.Users.create({
      name: "example",
      email: "admin@example.com",
      password: "$2a$10$yQeb44ZCO1Z8x5ncPv5hh.DekQH8EuZSPfnFnlrf2380o.ovalVHm", // Password123
    });

    // // await DummyData(Database); // CREATING DUMMY DATA FOR DEVELOPMENT

    
  });
