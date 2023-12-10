import { FriendService } from "../services/friendService";
import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { getUserIdFromToken } from "../utils/tokenVerfy";
import { UserService } from "../services/userService";

export class FriendController {
  private friendService: FriendService;
  private userService: UserService;

  constructor(dataSource: DataSource) {
    this.friendService = new FriendService(dataSource);
    this.userService = new UserService(dataSource);
  }

  async requestFriend(req: Request, res: Response) {
    const requesterId = getUserIdFromToken(req);
    const addresseeId = parseInt(req.body.id);
    if (!requesterId || isNaN(addresseeId)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    try {
      await this.friendService.requestFriend(requesterId, addresseeId);
      res.status(201).send("Friend request sent");
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async acceptFriend(req: Request, res: Response) {
    const addresseeId = getUserIdFromToken(req);
    if (addresseeId) {
      try {
        const requesterId = parseInt(req.body.id);
        await this.friendService.acceptFriend(requesterId, addresseeId);
        res.status(201).send("Friend request accepted");
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Unknown error",
        });
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
        res.status(200).send("Friend request declined");
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  async deleteFriend(req: Request, res: Response) {
    const userId = getUserIdFromToken(req);
    const friendId = parseInt(req.params.friendId); // Assuming you pass the friend's ID in the route parameter
    if (!userId || isNaN(friendId)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    try {
      await this.friendService.deleteFriend(userId, friendId);
      res.status(200).send("Friend deleted");
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getAllFriendsList(req: Request, res: Response) {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const friendIds = await this.friendService.getAllFriendsList(userId);
      const friends = await this.userService.getUsersByIds(friendIds);
      res.status(200).json(friends);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getRequestedFriends(req: Request, res: Response) {
    const userId = getUserIdFromToken(req);
    if (userId) {
      try {
        const requestedFriendsIds =
          await this.friendService.getAllFriendRequestsList(userId);
        const requestedFriends = await this.userService.getUsersByIds(
          requestedFriendsIds
        );
        res.status(200).json(requestedFriends);
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  async getAddressedFriends(req: Request, res: Response) {
    const userId = getUserIdFromToken(req);
    if (userId) {
      try {
        const addressedFriendsIds =
          await this.friendService.getAllAddressedFriendsList(userId);
        const addressedFriends = await this.userService.getUsersByIds(
          addressedFriendsIds
        );
        res.status(200).json(addressedFriends);
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
