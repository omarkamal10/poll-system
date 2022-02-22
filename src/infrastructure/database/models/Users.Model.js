/* eslint-disable import/no-anonymous-default-export */
//import LocaleKeys from "../../app/locales";

export default (connection, DataTypes) =>
  connection.define(
    "Users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(35),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: {
          args: true,
          msg:"Used Email!"
          //msg: LocaleKeys.USED_EMAIL,
        },
      },
      password: {
        type: DataTypes.STRING(1024),
        allowNull: false,
      },
    },
    {
      connection,
      tableName: "Users",
      timestamps: true,
    }
  );
