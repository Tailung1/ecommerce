import "./ResetPassword.scss";
import { useState } from "react";
import type { InputErrors, PasswordResetStep } from "./ResetPassword.types";
import ResetPasswordInputs from "./ResetPasswordInputs";
import { resetPasswordApi } from "./resetPassword.api";
import Completed from "./Completed";
import { BeatLoader } from "react-spinners";

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
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      } else if (inputValues.repeatNewPassword !== inputValues.newPassword) {
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
        setIsLoading(true);
        const response = await resetPasswordApi.requestOtp(inputValues.email);
        if (!response) {
          const data = response.json();
          setError(data.message);
        }
        setPasswordResetStep("VERIFY_OTP");
        setUserId(response.sessionId);
        return;
      }

      if (passwordResetStep === "VERIFY_OTP") {
        setIsLoading(true);
        await resetPasswordApi.verifyOtp(userId, inputValues.otpCode);
        setPasswordResetStep("RESET_PASSWORD");
        return;
      }

      if (passwordResetStep === "RESET_PASSWORD") {
        setIsLoading(true);
        await resetPasswordApi.resetPassword(userId, inputValues.newPassword);
        setPasswordResetStep("COMPLETED");
        return;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
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
      {passwordResetStep !== "COMPLETED" ? (
        <>
          {" "}
          <h2>Password Recovery</h2>
          <h1>{error}</h1>
          <hr />
          <h3
            className={` ${passwordResetStep === "VERIFY_OTP" ? "OtpPadding" : "defaultPadding"}`}
          >
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
              setPasswordResetStep={setPasswordResetStep}
              inputValues={inputValues}
              inputErrors={inputErrors}
              setInputValues={setInputValues}
              setInputErrors={setInputErrors}
            />
          </div>
          <button className='reset-password-submit-btn' onClick={handleSubmit}>
            {isLoading ? (
              <BeatLoader size={10} color='green' />
            ) : passwordResetStep === "VERIFY_OTP" ? (
              "ENTER NUMBER"
            ) : (
              "RECOVER PASSWORD"
            )}
          </button>
        </>
      ) : (
        <Completed />
      )}
    </div>
  );
}
