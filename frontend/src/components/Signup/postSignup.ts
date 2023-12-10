import { customAxios } from "../../Etc/customAxios";
import { AxiosResponse } from "axios";

export const postSignup = async (data: {
  username: string;
  password: string;
}) => {
  const res: AxiosResponse = await customAxios().post("/auth/signup", data);
  const id: string = res.data.token.id;
  return { id };
};
