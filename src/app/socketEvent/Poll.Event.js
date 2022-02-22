import Socket from "../../socket";

export const vote = async (data) => {
  return Socket.emit("vote", data);
};

export const destroy = async (data, clientId) => {
  return Socket.emit("pollDestroyed", "omar");
};

export const activate = async (data, clientId) => {
  return Socket.emit("pollActivated", data, clientId);
};
