import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";

export const postFriendRequest = async (userId: number) => {
  const data = { id: userId };
  const res: AxiosResponse = await customAxios().post("/friend/request", data);
  return { res };
};
