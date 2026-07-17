import { apiClient } from "../../api/apiClient";
import { API_URL } from "../../api/config";

export const authApi = {
  loginUser: (email: string, password: string) =>
    apiClient(`${API_URL}/users/login`, {
      method: "POST",
      body: { email, password },
    }),

  registerUser: (email: string, password: string) =>
    apiClient(`${API_URL}/api/users/register`, {
      method: "POST",
      body: { email, password },
    }),
};
