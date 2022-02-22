import Sequelize from "sequelize";
import * as Models from "../models";
import connection from "./Connection";
import relationships from "./Relationships";

const Users = Models.Users(connection, Sequelize.DataTypes);
const Polls = Models.Polls(connection, Sequelize.DataTypes);
const Option = Models.Option(connection, Sequelize.DataTypes);
const Voted = Models.Voted(connection, Sequelize.DataTypes)

const Database = {
  connection,

  Users,
  Polls,
  Option,
  Voted
};

relationships(Database);

export default Database;
