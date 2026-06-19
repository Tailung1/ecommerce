export type errorTypes = {
  email: string;
  otpCode: string;
  newPassword: string;
  repeatNewPassword: string;
};

export type PhaseTypes = {
  requestPasswordReset: boolean;
  checkOtpCode: boolean;
  resetPassword: boolean;
};


