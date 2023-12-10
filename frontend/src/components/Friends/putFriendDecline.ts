import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";

export const putFriendDecline = async (userId: number) => {
  const data = { id: userId };
  const res: AxiosResponse = await customAxios().put("/friends/decline", data);
  return { res };
};
