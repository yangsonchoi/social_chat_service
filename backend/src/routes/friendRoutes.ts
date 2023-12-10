import express, { Request, Response } from "express";
import { FriendController } from "../controllers/friendController";
import { AppDataSource } from "../config/typeOrmConfig";

const router = express.Router();
const friendController = new FriendController(AppDataSource);

router.post("/request", (req: Request, res: Response) => {
  friendController.requestFriend(req, res);
});

router.put("/accept", (req: Request, res: Response) => {
  friendController.acceptFriend(req, res);
});

router.put("/decline", (req: Request, res: Response) => {
  friendController.declineFriend(req, res);
});

export default router;
