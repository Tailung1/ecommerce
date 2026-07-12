import FloatingInput from "../../../components/reusable/FloatingInput";
import type {
  PasswordResetStep,
  ResetPasswordInputsProps,
  ResetPasswordFormValues,
} from "./ResetPassword.types";

import type { ReactNode } from "react";

export default function ResetPasswordInputs({
  passwordResetStep,
  setPasswordResetStep,
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
      <div className='flex flex-col items-start'>
        <FloatingInput
          label='Enter Code'
          value={inputValues.otpCode}
          propsedOnChange={(v) => handleValueChange("otpCode", v)}
          errorMessage={inputErrors.otpCode}
        />
        <span className='pt-2 pl-1' onClick={() => setPasswordResetStep("IDENTIFY_USER")}>
          &lt; Go back
        </span>
      </div>
    ),

    RESET_PASSWORD: (
      <div className={`new-password-container ${isNewPasswordError && "padding-when-errored"}`}>
        <FloatingInput
          label='New password'
          value={inputValues.newPassword}
          propsedOnChange={(v) => handleValueChange("newPassword", v)}
          errorMessage={inputErrors.newPassword}
          inputTypePassword='password'
        />
        <FloatingInput
          label='Repeat new password'
          value={inputValues.repeatNewPassword}
          propsedOnChange={(v) => handleValueChange("repeatNewPassword", v)}
          errorMessage={inputErrors.repeatNewPassword}
          inputTypePassword='password'
        />
      </div>
    ),
  };
  return stepUI[passwordResetStep];
}
