/* eslint-disable import/no-anonymous-default-export */
//import LocaleKeys from "../../app/locales";

export default (connection, DataTypes) =>
  connection.define(
    "Polls",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      options: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      connection,
      tableName: "Polls",
      timestamps: true,
    }
  );
