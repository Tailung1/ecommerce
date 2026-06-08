export type errorTypes = {
  userEmail: string;
  otpCode: string;
  newPassword: string;
  repeatNewPassword: string;
};

export type PhaseTypes = {
  userEmailPhase: boolean;
  otpPhase: boolean;
  recoveryPhase: boolean;
};
