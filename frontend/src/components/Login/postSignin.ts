import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";

export const postSignin = async (data: {
  username: string;
  password: string;
}) => {
  const res: AxiosResponse = await customAxios().post("/auth/login", data);
  const id: string = res.data.token.id;
  return { id };
};
