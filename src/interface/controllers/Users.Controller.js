import { usersPackage } from "../../app/packages";
import BaseController from "./Base.Controller";

class UserController extends BaseController {
  //FOR DEVELOPMENT
  getUsers = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.getUsers, req.body);
    res.render("index");
    if (data) {
      return this.okRes(req, res, data);
    }
  };
  //For "DEVELOPMENT" to register without having to create and activate account(To register quickly)
  register = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.register, req.body);
    if (data) {
      return this.okRes(req, res, data);
    }
  };

  create = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.create, req.body);
    if (data) {
      return this.okRes(req, res, data);
    }
  };

  activateAccount = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.activateAccount, req.body);
    if (data) {
      return this.okRes(req, res, data);
    }
  };

  login = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.login, req.body);
    if (data) {
      return this.okRes(req, res, data);
    }
  };

  changePassword = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.changePassword, req.body);
    if (data) {
      return this.okRes(req, res, data);
    }
  };

  resetPassword = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.resetPassword, req.body);
    if (data) {
      return this.okRes(req, res, data);
    }
  };

  verifyOTP = async (req, res, next) => {
    const data = await this.exec(next, usersPackage.verifyOTP, req.body);
    if (data) {
      return this.okRes(req, res, data);
    }
  };
}

export default new UserController();
