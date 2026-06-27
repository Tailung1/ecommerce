import "./ResetPassword.scss";
import { useState } from "react";
import type { InputErrors, PasswordResetStep } from "./ResetPassword.types";
import ResetPasswordInputs from "./ResetPasswordInputs";

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

  const handleValueChange = (value: string) => {
    if (passwordResetStep === "VERIFY_OTP") {
      setInputValues((prev) => ({ ...prev, otpCode: value }));
    } else {
      setInputValues((prev) => ({ ...prev, email: value }));
    }
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateInputs = () => {
    let errors = inputErrors;

    if (passwordResetStep === "IDENTIFY_USER") {
      if (!emailRegex.test(inputValues.email)) {
        errors = { ...inputErrors, email: "Invalid email format" };
      }
    } else if (passwordResetStep === "VERIFY_OTP") {
      if (inputValues.otpCode.length !== 4) {
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

  const getData = () => {
    let requestData = {};
    if (passwordResetStep === "IDENTIFY_USER") {
      requestData = { email: inputValues.email };
    } else if (passwordResetStep === "VERIFY_OTP") {
      requestData = { otpCode: inputValues.otpCode };
    } else if (passwordResetStep === "RESET_PASSWORD") {
      requestData = {
        newPassword: inputValues.newPassword,
        repeatNewPassword: inputValues.repeatNewPassword,
      };
    }
    return { requestData };
  };

  const handlePostRequestAction = () => {
    const passwordResetStateTransitions: Record<PasswordResetStep, PasswordResetStep> = {
      IDENTIFY_USER: "VERIFY_OTP",
      VERIFY_OTP: "RESET_PASSWORD",
      RESET_PASSWORD: "COMPLETED",
      COMPLETED: "COMPLETED",
    };
    // setStep(nextStep[passwordResetStep]);
  };

  const handleSubmit = () => {
    if (isError) return;
    const validationResult = validateInputs();
    if (validationResult) return (isError = true);
  };

  return (
    <div
      className={`reset-password-container ${passwordResetStep === "VERIFY_OTP" ? "animate" : ""}`}
    >
      <h2>Password Recovery</h2>
      <hr />
      <h3>
        {passwordResetStep === "VERIFY_OTP"
          ? "Verify Identify"
          : "Enter your phone number or email"}
      </h3>
      <h4
        className={`${passwordResetStep === "VERIFY_OTP" ? "opacityShow" : "opacityHide"}`}
      >{`Code sent to your email: ${inputValues.email}`}</h4>
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
        />
      </div>
      <button onClick={handleSubmit}>
        {passwordResetStep === "VERIFY_OTP" ? "ENTER NUMBER" : "RECOVER PASSWORD"}
      </button>
    </div>
  );
}
