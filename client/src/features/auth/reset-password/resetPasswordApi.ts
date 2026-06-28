import { apiClient } from "../../../api/client";

export const authApi = {
  requestOtp: (email: string) =>
    apiClient("http://localhost:3000/api/reset-password/request-otp", { email }),

  verifyOtp: (email: string, otp: string) =>
    apiClient("http://localhost:3000/api/reset-password/verify-otp", { email, otp }),

  resetPassword: (email: string, password: string) =>
    apiClient("http://localhost:3000/api/reset-password/reset-password", { email, password }),
};
