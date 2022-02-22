/* eslint-disable import/no-anonymous-default-export */

export default (connection, DataTypes) =>
  connection.define(
    "Option",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      option: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      votes: {
        type: DataTypes.INTEGER,
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
    },
    {
      connection,
      tableName: "Option",
      timestamps: true,
    }
  );
