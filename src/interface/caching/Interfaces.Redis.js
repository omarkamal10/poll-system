import util from "util";
import Config from "../../../config";
import Redis from "./Client.Redis";

export const get = async (key) => {
  Redis.get = util.promisify(Redis.get);
  return Redis.get(key)
    .then((data) => {
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const set = (key, value) => {
  Redis.set = util.promisify(Redis.set);
  return Redis.set(
    key,
    typeof value === "object" ? JSON.stringify(value) : value
  )
    .then(() => value)
    .catch((err) => {
      throw err;
    });
};

export const perishableSet = (key, value) => {
  Redis.setex = util.promisify(Redis.setex);
  return Redis.setex(
    key,
    Config.Caching.expirationLifeTime,
    typeof value === "object" ? JSON.stringify(value) : value
  )
    .then(() => value)
    .catch((err) => {
      throw err;
    });
};

export const destroy = (key) => {
  Redis.del = util.promisify(Redis.del);

  return Redis.del(key)
    .then(() => true)
    .catch((err) => {
      throw err;
    });
};
