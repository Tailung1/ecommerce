import { apiClient } from "../../api/client.api";

export const authApi = {
  loginUser: (email: string, password: string) =>
    apiClient("/users/login", {
      method: "POST",
      body: { email, password },
    }),

  registerUser: (email: string, password: string) =>
    apiClient("/users/register", {
      method: "POST",
      body: { email, password },
    }),
};
