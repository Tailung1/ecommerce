import "./ResetPassword.scss";
import { useState } from "react";
import FloatingInput from "../../../components/reusable/FloatingInput";
import type { errorTypes, PhaseTypes } from "./ResetPassword-types";

export default function ResetPassword() {
  const [inputErrors, setInputErrors] = useState<errorTypes>({
    userEmail: "",
    otpCode: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [phases, setPhases] = useState<PhaseTypes>({
    userEmailPhase: true,
    otpPhase: false,
    recoveryPhase: false,
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let inputValues = {
    userEmail: "",
    otpCode: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  const handleValueChange = (value: string) => {
    if (phases.otpPhase) {
      inputValues = { ...inputValues, otpCode: value };
    } else {
      inputValues = { ...inputValues, userEmail: value };
    }
  };

  const validateInputs = () => {
    let errors: errorTypes | {} = {};
    if (phases.otpPhase && inputValues.otpCode.length !== 4) return;
    const emailSyntax = emailRegex.test(inputValues.userEmail);
    if (!emailSyntax) {
      errors = { ...inputErrors, userEmail: "Invalid email format" };
      return errors;
    }

    return Object.values(inputErrors).some(Boolean);
  };
  const getCurrentPhase = () => {
    const entry = Object.entries(phases).find(([_, value]) => value === true);
    return entry ? entry[0] : "userEmailPhase";
  };

  let isError = false;

  const handleSubmit = () => {
    if (isError) return;
    const validationResult = validateInputs();
    if (validationResult) {
      isError = true;
      return;
    }
    const currectPhase = getCurrentPhase();
  };

  return (
    <div className={`reset-password-container ${phases.otpPhase ? "animate" : ""}`}>
      <h2>Password Recovery</h2>
      <hr />
      <h3>{phases.otpPhase ? "Verify Identify" : "Enter your phone number or email"}</h3>
      <h4
        className={`${phases.otpPhase ? "opacityShow" : "opacityHide"}`}
      >{`Code sent to your email: ${inputValues.userEmail}`}</h4>
      <div
        className={`${
          isError ? "isErrorPadding" : "defaultPadding"
        } reset-password-input-container`}
      >
        <FloatingInput
          label={phases.otpPhase ? "Enter Code" : "Email"}
          value={`${phases.otpPhase ? inputValues.otpCode : inputValues.userEmail}`}
          propsedOnChange={handleValueChange}
          errorMessage={inputErrors.userEmail}
        />
      </div>
      <button onClick={handleSubmit}>
        {phases.otpPhase ? "ENTER NUMBER" : "RECOVER PASSWORD"}
      </button>
    </div>
  );
}
