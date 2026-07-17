import { apiClient } from "../../api/apiClient";

export const authApi = {
  loginUser: (email: string, password: string) =>
    apiClient("http://localhost:3000/api/users/login", {
      method: "POST",
      body: { email, password },
    }),

  registerUser: (email: string, password: string) =>
    apiClient("http://localhost:3000/api/users/register", {
      method: "POST",
      body: { email, password },
    }),
};
