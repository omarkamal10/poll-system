/* eslint-disable import/no-anonymous-default-export */
//import LocaleKeys from "../../app/locales";

export default (connection, DataTypes) =>
  connection.define(
    "Voted",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      pollId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Polls",
          key: "id",
        },
      },
      optionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "Option",
          key: "id",
        },
      },
    },
    {
      connection,
      tableName: "Voted",
      timestamps: true,
    }
  );
