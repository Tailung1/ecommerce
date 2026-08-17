import { apiClient } from "../../../api/client.api";


export const resetPasswordApi = {
  requestOtp: (email: string) =>
    apiClient("/reset-password/request-otp", {
      method: "POST",
      body: { email },
    }),

  verifyOtp: (userId: string, otp: string) =>
    apiClient("/reset-password/verify-otp", {
      method: "POST",
      body: { userId, otp },
    }),

  resetPassword: (userId: string, newPassword: string) =>
    apiClient("/reset-password/reset-password", {
      method: "POST",
      body: { userId, newPassword },
    }),
};
