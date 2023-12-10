import express, { Request, Response } from "express";
import { FriendController } from "../controllers/friendController";
import { AppDataSource } from "../config/typeOrmConfig";

const router = express.Router();
const friendController = new FriendController(AppDataSource);

router.get("/", (req: Request, res: Response) => {
  friendController.getAllFriendsList(req, res);
});

router.post("/request", (req: Request, res: Response) => {
  friendController.requestFriend(req, res);
});

router.put("/accept", (req: Request, res: Response) => {
  friendController.acceptFriend(req, res);
});

router.put("/decline", (req: Request, res: Response) => {
  friendController.declineFriend(req, res);
});

router.get("/requested", (req: Request, res: Response) => {
  friendController.getRequestedFriends(req, res);
});

router.get("/addressed", (req: Request, res: Response) => {
  friendController.getAddressedFriends(req, res);
});


export default router;
