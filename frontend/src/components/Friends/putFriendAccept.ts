import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";

export const putFriendAccept = async (userId: number) => {
  const data = { id: userId };
  const res: AxiosResponse = await customAxios().put("/friends/accept", data);
  return { res };
};
