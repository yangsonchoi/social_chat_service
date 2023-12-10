import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";

export const deleteFriend = async (userId: number) => {
  const res: AxiosResponse = await customAxios().delete(`/friend/${userId}`);
  return { res };
};
