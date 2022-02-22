/* eslint-disable import/no-anonymous-default-export */
export default ({
    Users,
    Polls,
    Option,
    Voted
}) => {
    Users.hasMany(Polls, {as: "Polls",foreignKey: "userId"})
    Polls.belongsTo(Users, {as: "user",foreignKey: "userId"})

    Polls.hasMany(Option, {as: "Option",foreignKey: "pollId"})
    Option.belongsTo(Polls, {as: "poll",foreignKey: "pollId"})

    Users.hasOne(Voted, {as: "Voted",foreignKey: "userId"})
    Voted.belongsTo(Users, {as: "user",foreignKey: "userId"})

    Option.hasMany(Voted, {as: "Voted",foreignKey: "optionId"})
    Voted.belongsTo(Option, {as: "option",foreignKey: "optionId"})

    Polls.hasMany(Voted, {as: "Voted",foreignKey: "pollId"})
    Voted.belongsTo(Polls, {as: "poll",foreignKey: "pollId"})




}