import BaseController from "./Base.Controller";
import { pollsPackage } from "../../app/packages";
// import { pollVoteEvent } from "../socketEvent";
class UserController extends BaseController {
  createPoll = async (req, res, next) => {
    const data = await this.exec(
      next,
      pollsPackage.createPoll,
      req.body,
      req.user
    );
    if (data) {
      return this.okRes(req, res, data);
    }
  };

  getPoll = async (req, res, next) => {
    const data = await this.exec(next, pollsPackage.getPoll, req.params);
    if (data) {
      return this.okRes(req, res, data);
    } else {
      this.badRes(next, this.LocaleKeys.BAD_ID);
    }
  };

  getMyPolls = async (req, res, next) => {
    const data = await pollsPackage.getMyPolls(req.user);
    if (data) return res.status(201).json(data);
    console.log("error in controller getMyPolls");
  };

  votePoll = async (req, res, next) => {
    const data = await this.exec(
      next,
      pollsPackage.votePoll,
      req.params,
      req.user,
      req.body
    );
    if (data) {
      return this.okRes(req, res, data);
    } else {
      this.badRes(next, this.LocaleKeys.BAD_ID);
    }
  };

  votePollView = async (req, res, next) => {
    res.render("index");
  };

  getUserPollsById = async (req, res, next) => {
    const data = await this.exec(
      next,
      pollsPackage.getUserPollsById,
      req.params
    );
    if (data) {
      return this.okRes(req, res, data);
    } else {
      this.badRes(next, this.LocaleKeys.BAD_ID);
    }
  };

  getPollResults = async (req, res, next) => {
    const data = await this.exec(next, pollsPackage.getPollResults, req.params);
    if (data) {
      return this.okRes(req, res, data);
    } else {
      this.badRes(next, this.LocaleKeys.BAD_ID);
    }
  };

  getUserVotes = async (req, res, next) => {
    const data = await this.exec(next, pollsPackage.getUserVotes, req.params);
    if (data) {
      return this.okRes(req, res, data);
    } else {
      this.badRes(next, this.LocaleKeys.BAD_ID);
    }
  };

  voteSocket = async (req, res, next) => {
    // const data = await pollsPackage.voteSocket(req.params, 2, req.body);
    // //if(data) return res.status(201).json(data)
    // if (data)
    //   res.render("index", {
    //     data: data,
    //   });
    // console.log("error in controller voteSocket");
  };
}

export default new UserController();
