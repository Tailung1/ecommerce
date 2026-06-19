export type errorTypes = {
  email: string;
  otpCode: string;
  newPassword: string;
  repeatNewPassword: string;
};

export type PasswordRecoveryStepTypes =
  | "collect_identifier"
  | "verify_otp"
  | "set_new_password"
  | "completed";
