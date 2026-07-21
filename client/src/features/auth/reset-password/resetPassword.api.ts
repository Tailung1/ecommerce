import { apiClient } from "../../../api/client.api";

const API_URL = import.meta.env.VITE_API_URL;

export const resetPasswordApi = {
  requestOtp: (email: string) =>
    apiClient(`${API_URL}/reset-password/request-otp`, {
      method: "POST",
      body: { email },
    }),

  verifyOtp: (userId: string, otp: string) =>
    apiClient("${API_URL}/reset-password/verify-otp", {
      method: "POST",
      body: { userId, otp },
    }),

  resetPassword: (userId: string, newPassword: string) =>
    apiClient("${API_URL}/reset-password/reset-password", {
      method: "POST",
      body: { userId, newPassword },
    }),
};
