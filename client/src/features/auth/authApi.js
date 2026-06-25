import { apiClient } from "../../api/client";

export const authApi = {
  requestOtp: (email) =>
    apiClient("http://localhost:3000/api/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  verifyOtp: (email, otp) =>
    apiClient("http://localhost:3000/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }),

  resetPassword: (email, password) =>
    apiClient("http://localhost:3000/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};
