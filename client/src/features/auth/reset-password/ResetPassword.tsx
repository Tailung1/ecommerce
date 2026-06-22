import "./ResetPassword.scss";
import { useState } from "react";
import FloatingInput from "../../../components/reusable/FloatingInput";
import type { errorTypes, PasswordRecoveryStepTypes } from "./ResetPassword.types";

export default function ResetPassword() {
  const [inputValues, setInputValues] = useState({
    email: "",
    otpCode: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [inputErrors, setInputErrors] = useState<errorTypes>({
    email: "",
    otpCode: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [passwordRecoveryStep, setPasswordRecoveryStep] =
    useState<PasswordRecoveryStepTypes>("collect_identifier");

  const handleValueChange = (value: string) => {
    if (passwordRecoveryStep === "verify_otp") {
      setInputValues((prev) => ({ ...prev, checkOtpCode: value }));
    } else {
      setInputValues((prev) => ({ ...prev, email: value }));
    }
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateInputs = () => {
    let errors!: errorTypes;

    if (passwordRecoveryStep === "collect_identifier") {
      if (!emailRegex.test(inputValues.email)) {
        errors = { ...inputErrors, email: "Invalid email format" };
      }
    } else if (passwordRecoveryStep === "verify_otp") {
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
    let dataToSend = {};
    if (passwordRecoveryStep === "collect_identifier") {
      dataToSend = { email: inputValues.email };
    } else if (passwordRecoveryStep === "verify_otp") {
      dataToSend = { otpCode: inputValues.otpCode };
    } else if (passwordRecoveryStep === "set_new_password") {
      dataToSend = {
        newPassword: inputValues.newPassword,
        repeatNewPassword: inputValues.repeatNewPassword,
      };
    }
    return { dataToSend };
  };

  const handlePostRequestAction = () => {
    const nextStep: Record<PasswordRecoveryStepTypes, PasswordRecoveryStepTypes> = {
      collect_identifier: "verify_otp",
      verify_otp: "set_new_password",
      set_new_password: "completed",
      completed: "completed",
    };
    setPasswordRecoveryStep(nextStep[passwordRecoveryStep]);
  };

  const startResetRequest = async () => {
    const { dataToSend } = getData();
    try {
      const response = await fetch(`http://localhost:3000/api/users/${passwordRecoveryStep}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      const result = await response.json();
      if (!response.ok) {
        console.log(result.message);
        return;
      }
      console.log(result.message);
      handlePostRequestAction();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (isError) return;
    const validationResult = validateInputs();
    if (validationResult) return (isError = true);

    startResetRequest();
  };

  return (
    <div
      className={`reset-password-container ${
        passwordRecoveryStep === "verify_otp" ? "animate" : ""
      }`}
    >
      <h2>Password Recovery</h2>
      <hr />
      <h3>
        {passwordRecoveryStep === "verify_otp"
          ? "Verify Identify"
          : "Enter your phone number or email"}
      </h3>
      <h4
        className={`${passwordRecoveryStep === "verify_otp" ? "opacityShow" : "opacityHide"}`}
      >{`Code sent to your email: ${inputValues.email}`}</h4>
      <div
        className={`${
          isError ? "isErrorPadding" : "defaultPadding"
        } reset-password-input-container`}
      >
        <FloatingInput
          label={passwordRecoveryStep === "collect_identifier" ? "Enter Code" : "Email"}
          value={`${
            passwordRecoveryStep === "verify_otp" ? inputValues.otpCode : inputValues.email
          }`}
          propsedOnChange={handleValueChange}
          errorMessage={inputErrors.email}
        />
      </div>
      <button onClick={handleSubmit}>
        {passwordRecoveryStep === "verify_otp" ? "ENTER NUMBER" : "RECOVER PASSWORD"}
      </button>
    </div>
  );
}
