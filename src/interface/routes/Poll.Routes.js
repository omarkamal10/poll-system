import auth from "../middleware/auth";
import { pollController } from "../controllers";
const router = require("express").Router();

router.get("/:id", pollController.getPoll);
router.post("/createpoll", auth, pollController.createPoll);
router.post("/:id", auth, pollController.votePoll);
router.get("/userpolls/:id", auth, pollController.getUserPollsById);
router.get("/me/me", auth, pollController.getMyPolls);
router.get("/results/:id", pollController.getPollResults);
router.get("/user/:id", pollController.getUserVotes);
router.get("/vote/:id", pollController.voteSocket);

export default router;
