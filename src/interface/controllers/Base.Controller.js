import LocaleKeys from "../locales";
import Errors from "../errors";

class BaseController {
  constructor() {
    this.LocaleKeys = LocaleKeys;
  }

  async exec(next, fn, ...params) {
    const { err, data } = await fn(...params);
    if (err) {
      if (err.isAppError) {
        next(Errors.http.badRequest(err.error));
        return null;
      } else {
        next(err.error);
        return null;
      }
    }
    return data;
  }

  async fire(next, fn, ...params) {
    const isSuccess = await fn(...params);
    if (!isSuccess) {
      next(Errors.__handleUnknownError());
    }
  }

  okRes(req, res, data, statusCode = 200) {
    return res.status(statusCode).json({
      //message: req.t(LocaleKeys.OK),
      data,
    });
  }

  badRes(next, message) {
    next(Errors.http.badRequest(message));
  }
}

export default BaseController;
