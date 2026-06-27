export type InputErrors = {
  email: string;
  otpCode: string;
  newPassword: string;
  repeatNewPassword: string;
};

export type PasswordResetStep = "IDENTIFY_USER" | "VERIFY_OTP" | "RESET_PASSWORD" | "COMPLETED";

export type ResetPasswordFormValues = {
  email: string;
  otpCode: string;
  newPassword: string;
  repeatNewPassword: string;
};

type ResetPasswordFormErrors = {
  email: string;
  otpCode: string;
  newPassword: string;
  repeatNewPassword: string;
};

export type ResetPasswordInputsProps = {
  passwordResetStep: PasswordResetStep;
  inputValues: ResetPasswordFormValues;
  inputErrors: ResetPasswordFormErrors;
  setInputValues: React.Dispatch<React.SetStateAction<ResetPasswordFormValues>>;
};
