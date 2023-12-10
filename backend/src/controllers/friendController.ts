import { FriendService } from "../services/friendService";
import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { getUserIdFromToken } from "../utils/tokenVerfy";

export class FriendController {
  private friendService: FriendService;

  constructor(dataSource: DataSource) {
    this.friendService = new FriendService(dataSource);
  }

  async requestFriend(req: Request, res: Response) {
    const requesterId = getUserIdFromToken(req);
    const addresseeId = parseInt(req.body.id);
    if (!requesterId || isNaN(addresseeId)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    try {
      await this.friendService.requestFriend(requesterId, addresseeId);
      res.status(201).send('Friend request sent');
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
  }

  async acceptFriend(req: Request, res: Response) {
    const addresseeId = getUserIdFromToken(req);
    if (addresseeId) {
      try {
        const requesterId = parseInt(req.body.id);
        await this.friendService.acceptFriend(requesterId, addresseeId);
        res.status(201).send('Friend request accepted');
      } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  async declineFriend(req: Request, res: Response) {
    const addresseeId = getUserIdFromToken(req);
    if (addresseeId) {
      try {
        const requesterId = parseInt(req.body.id);
        await this.friendService.declineFriend(requesterId, addresseeId);
        res.status(200).send('Friend request declined');
      } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
