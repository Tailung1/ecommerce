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
}: ResetPasswordInputsProps) {
  const handleValueChange = (field: keyof ResetPasswordFormValues, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
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
      <div>
        <FloatingInput
          label='New password'
          value={inputValues.newPassword}
          propsedOnChange={(v) => handleValueChange("newPassword", v)}
          errorMessage={inputErrors.newPassword}
        />
        <FloatingInput
          label='Repeat new Password'
          value={inputValues.repeatNewPassword}
          propsedOnChange={(v) => handleValueChange("repeatNewPassword", v)}
          errorMessage={inputErrors.repeatNewPassword}
        />
      </div>
    ),
  };
  return stepUI[passwordResetStep];
}
