import { apiClient } from "../../../api/client";

export const authApi = {
  requestOtp: (email: string) =>
    apiClient("http://localhost:3000/api/reset-password/request-otp", { email }),

  verifyOtp: (sessionId: string) =>
    apiClient("http://localhost:3000/api/reset-password/verify-otp", { sessionId }),

  resetPassword: (sessionId: string, password: string) =>
    apiClient("http://localhost:3000/api/reset-password/reset-password", { sessionId, password }),
};
