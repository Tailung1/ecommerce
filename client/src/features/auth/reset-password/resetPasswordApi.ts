import { apiClient } from "../../../api/client";

export const resetPasswordApi = {
  requestOtp: (email: string) =>
    apiClient("http://localhost:3000/api/reset-password/request-otp", { email }),

  verifyOtp: (userId: string, otp: string) =>
    apiClient("http://localhost:3000/api/reset-password/verify-otp", { userId, otp }),

  resetPassword: (userId: string, newPassword: string) =>
    apiClient("http://localhost:3000/api/reset-password/reset-password", { userId, newPassword }),
};
