// import Socket from "../../socket"

// // On new client connection
// return Socket.on("connection", (socket) => {
//     Socket.emit("update", optionObj);

//     // On new vote
//     socket.on("vote", (index) => {

//         // Increase the vote at index
//         if (optionObj[index]) {
//             optionObj[index].votes += 1;
//         }

//         // Show the candidates in the console for testing
//         console.log(optionObj);

//         // Tell everybody else about the new vote
//         Socket.emit("update", optionObj);
//     });
// });