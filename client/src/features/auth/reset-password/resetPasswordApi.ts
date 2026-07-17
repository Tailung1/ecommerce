import { apiClient } from "../../../api/apiClient";

export const resetPasswordApi = {
  requestOtp: (email: string) =>
    apiClient("http://localhost:3000/api/reset-password/request-otp", {
      method: "POST",
      body: { email },
    }),

  verifyOtp: (userId: string, otp: string) =>
    apiClient("http://localhost:3000/api/reset-password/verify-otp", {
      method: "POST",
      body: { userId, otp },
    }),

  resetPassword: (userId: string, newPassword: string) =>
    apiClient("http://localhost:3000/api/reset-password/reset-password", {
      method: "POST",
      body: { userId, newPassword },
    }),
};
