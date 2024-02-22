import instance from "../../config";

export const login_user_api = async (user) => {
  const response = await instance.post("login", JSON.stringify(user));
  return response.data;
};
