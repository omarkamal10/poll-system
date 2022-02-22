import auth from "../middleware/auth";
import { userController } from "../controllers";
const router = require("express").Router();

router.get("/", userController.getUsers); // for development only

router.post("/login", userController.login);

router.post("/register", userController.register);
router.post("/create", userController.create);
router.post("/activate-account", userController.activateAccount);
router.post("/changepassword", auth, userController.changePassword);
router.post("/resetpassword", userController.resetPassword);
router.post("/verifyotp", userController.verifyOTP);

export default router;
