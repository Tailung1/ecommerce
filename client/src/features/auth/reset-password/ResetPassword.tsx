import "./ResetPassword.scss";
import { useState } from "react";
import type { InputErrors, PasswordResetStep } from "./ResetPassword.types";
import ResetPasswordInputs from "./ResetPasswordInputs";
import { authApi } from "./resetPasswordApi";

export default function ResetPassword() {
  const [inputValues, setInputValues] = useState({
    email: "",
    otpCode: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: "",
    otpCode: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const [passwordResetStep, setPasswordResetStep] = useState<PasswordResetStep>("IDENTIFY_USER");
  const [error, setError] = useState<string>("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateInputs = () => {
    let errors = {
      email: "",
      otpCode: "",
      newPassword: "",
      repeatNewPassword: "",
    };

    if (passwordResetStep === "IDENTIFY_USER") {
      if (!emailRegex.test(inputValues.email)) {
        errors = { ...inputErrors, email: "Invalid email" };
      }
    } else if (passwordResetStep === "VERIFY_OTP") {
      if (inputValues.otpCode.length !== 6) {
        errors = { ...inputErrors, otpCode: "Invalid data" };
      }
    } else {
      if (inputValues.newPassword.length < 5) {
        errors = { ...inputErrors, newPassword: "Min 5 charachters" };
      }
      if (inputValues.repeatNewPassword !== inputValues.newPassword) {
        errors = { ...inputErrors, repeatNewPassword: "Passwords dosn't much" };
      }
    }

    setInputErrors(errors);
    return Object.values(errors).some(Boolean);
  };

  let isError = false;
  const startPasswodResetRequest = async () => {
    try {
      if (passwordResetStep === "IDENTIFY_USER") {
        await authApi.requestOtp(inputValues.email);
        setPasswordResetStep("VERIFY_OTP");
        return;
      }

      if (passwordResetStep === "VERIFY_OTP") {
        await authApi.verifyOtp(inputValues.email, inputValues.otpCode);
        setPasswordResetStep("RESET_PASSWORD");
        return;
      }

      if (passwordResetStep === "RESET_PASSWORD") {
        await authApi.resetPassword(inputValues.email, inputValues.newPassword);
        setPasswordResetStep("COMPLETED");
        return;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (validateInputs()) return;
    startPasswodResetRequest();
  };

  return (
    <div
      className={`reset-password-container ${passwordResetStep === "VERIFY_OTP" ? "animate" : ""}`}
    >
      <h2>Password Recovery</h2>
      <h1>{error}</h1>
      <hr />
      <h3 className={` ${passwordResetStep === "VERIFY_OTP" ? "OtpPadding" : "defaultPadding"}`}>
        {passwordResetStep === "VERIFY_OTP"
          ? "Verify Identify"
          : "Enter your phone number or email"}
      </h3>
      {passwordResetStep === "VERIFY_OTP" && (
        <h4>{`Code sent to your email: ${inputValues.email}`}</h4>
      )}
      <div
        className={`${
          isError ? "isErrorPadding" : "defaultPadding"
        } reset-password-input-container`}
      >
        <ResetPasswordInputs
          passwordResetStep={passwordResetStep}
          inputValues={inputValues}
          inputErrors={inputErrors}
          setInputValues={setInputValues}
          setInputErrors={setInputErrors}
        />
      </div>
      <button onClick={handleSubmit}>
        {passwordResetStep === "VERIFY_OTP" ? "ENTER NUMBER" : "RECOVER PASSWORD"}
      </button>
    </div>
  );
}
