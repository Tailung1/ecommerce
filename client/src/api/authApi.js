import { apiClient } from "./client";

export const authApi = {
  requestOtp: (email) =>
    apiClient("/api/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  verifyOtp: (email, otp) =>
    apiClient("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }),

  resetPassword: (email, password) =>
    apiClient("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};
