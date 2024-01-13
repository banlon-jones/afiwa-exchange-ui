import client from "./client";

const endpoint = "/api/public/user";

export const signup = async (user) => {
  const response = await client.post(`${endpoint}/signup`, user);
  return response.data;
};
