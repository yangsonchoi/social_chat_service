import { Request } from "express";

export const getUserIdFromToken = (req: Request): number | null => {
	if (!req) {
    return null;
  } else {
    const token = req.get("Authorization")?.split(" ")[1];
    if (!token) {
      return null;
    } else {
      return parseInt(token);
    }
  }
}
