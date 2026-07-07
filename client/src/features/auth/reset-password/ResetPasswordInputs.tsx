import FloatingInput from "../../../components/reusable/FloatingInput";
import type {
  PasswordResetStep,
  ResetPasswordInputsProps,
  ResetPasswordFormValues,
} from "./ResetPassword.types";
import type { ReactNode } from "react";

export default function ResetPasswordInputs({
  passwordResetStep,
  inputValues,
  inputErrors,
  setInputValues,
  setInputErrors,
}: ResetPasswordInputsProps) {
  const handleValueChange = (field: keyof ResetPasswordFormValues, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    const entries = Object.entries(inputErrors).map(([key]) => [key, ""]);
    const newInputErrros = Object.fromEntries(entries);
    setInputErrors(newInputErrros);
  };
  const isNewPasswordError = inputErrors.newPassword.length !== 0;
  console.log(isNewPasswordError);
  console.log(inputErrors.newPassword.length);
  console.log(inputErrors.newPassword);

  const stepUI: Partial<Record<PasswordResetStep, ReactNode>> = {
    IDENTIFY_USER: (
      <FloatingInput
        label='Email'
        value={inputValues.email}
        propsedOnChange={(v) => handleValueChange("email", v)}
        errorMessage={inputErrors.email}
      />
    ),

    VERIFY_OTP: (
      <FloatingInput
        label='Enter Code'
        value={inputValues.otpCode}
        propsedOnChange={(v) => handleValueChange("otpCode", v)}
        errorMessage={inputErrors.otpCode}
      />
    ),

    RESET_PASSWORD: (
      <div className={`new-password-container ${isNewPasswordError && "padding-when-errored"}`}>
        <FloatingInput
          label='New password'
          value={inputValues.newPassword}
          propsedOnChange={(v) => handleValueChange("newPassword", v)}
          errorMessage={inputErrors.newPassword}
        />
        <FloatingInput
          label='Repeat new password'
          value={inputValues.repeatNewPassword}
          propsedOnChange={(v) => handleValueChange("repeatNewPassword", v)}
          errorMessage={inputErrors.repeatNewPassword}
        />
      </div>
    ),
  };
  return stepUI[passwordResetStep];
}
