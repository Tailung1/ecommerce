import "./ResetPassword.scss";
import { useState } from "react";
import FloatingInput from "../../../components/reusable/FloatingInput";
import type { errorTypes, PhaseTypes } from "./ResetPassword-types";

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
  const [phases, setPhases] = useState<PhaseTypes>({
    requestPasswordReset: true,
    checkOtpCode: false,
    resetPassword: false,
  });

  const handleValueChange = (value: string) => {
    if (phases.checkOtpCode) {
      setInputValues((prev) => ({ ...prev, checkOtpCode: value }));
    } else {
      setInputValues((prev) => ({ ...prev, email: value }));
    }
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateInputs = () => {
    let errors!: errorTypes;

    if (phases.requestPasswordReset) {
      if (!emailRegex.test(inputValues.email)) {
        errors = { ...inputErrors, email: "Invalid email format" };
      }
    } else if (phases.checkOtpCode) {
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

  const getActivePhase = (): keyof PhaseTypes => {
    const keys = Object.keys(phases) as (keyof PhaseTypes)[];
    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i];
      if (phases[key] === true) {
        return key;
      }
    }
    return "requestPasswordReset";
  };

  const getData = () => {
    let data = {};
    const activePhase = getActivePhase();
    if (activePhase === "requestPasswordReset") {
      data = { email: inputValues.email };
    } else if (activePhase === "checkOtpCode") {
      data = { otpCode: inputValues.otpCode };
    } else if (activePhase === "resetPassword") {
      data = {
        newPassword: inputValues.newPassword,
        repeatNewPassword: inputValues.repeatNewPassword,
      };
    }
    return { data, activePhase };
  };

  const startResetRequest = async () => {
    const { data, activePhase } = getData();
    try {
      const response = await fetch(`http://localhost:3000/api/users/${activePhase}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        console.log(result.message);
        return;
      }
      console.log(result.message);
      setPhases((prev) => ({ ...prev, checkOtpCode: true }));
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
    <div className={`reset-password-container ${phases.checkOtpCode ? "animate" : ""}`}>
      <h2>Password Recovery</h2>
      <hr />
      <h3>{phases.checkOtpCode ? "Verify Identify" : "Enter your phone number or email"}</h3>
      <h4
        className={`${phases.checkOtpCode ? "opacityShow" : "opacityHide"}`}
      >{`Code sent to your email: ${inputValues.email}`}</h4>
      <div
        className={`${
          isError ? "isErrorPadding" : "defaultPadding"
        } reset-password-input-container`}
      >
        <FloatingInput
          label={phases.checkOtpCode ? "Enter Code" : "Email"}
          value={`${phases.checkOtpCode ? inputValues.otpCode : inputValues.email}`}
          propsedOnChange={handleValueChange}
          errorMessage={inputErrors.email}
        />
      </div>
      <button onClick={handleSubmit}>
        {phases.checkOtpCode ? "ENTER NUMBER" : "RECOVER PASSWORD"}
      </button>
    </div>
  );
}
