import { apiClient } from "../../api/apiClient";
const API_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  loginUser: (email: string, password: string) =>
    apiClient(`${API_URL}/users/login`, {
      method: "POST",
      body: { email, password },
    }),

  registerUser: (email: string, password: string) =>
    apiClient(`${API_URL}/users/register`, {
      method: "POST",
      body: { email, password },
    }),
};
