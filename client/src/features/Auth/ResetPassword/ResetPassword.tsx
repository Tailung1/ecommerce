import "./ResetPassword.scss";
import { useState } from "react";
import FloatingInput from "../../../components/reusable/FloatingInput";
import type { errorTypes, PhaseTypes } from "./ResetPassword-types";

export default function ResetPassword() {
  const [inputValues, setInputValues] = useState({
    userEmail: "",
    otpCode: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [inputErrors, setInputErrors] = useState<errorTypes>({
    userEmail: "",
    otpCode: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [phases, setPhases] = useState<PhaseTypes>({
    userEmail: true,
    otpCode: false,
    recovery: false,
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleValueChange = (value: string) => {
    if (phases.otpCode) {
      setInputValues((prev) => ({ ...prev, otpCode: value }));
    } else {
      setInputValues((prev) => ({ ...prev, userEmail: value }));
    }
  };

  const validateInputs = () => {
    let errors: errorTypes | {} = {};
    if (phases.otpCode && inputValues.otpCode.length !== 4) return;
    const emailSyntax = emailRegex.test(inputValues.userEmail);
    if (!emailSyntax) {
      errors = { ...inputErrors, userEmail: "Invalid email format" };
      return errors;
    }
    return Object.values(inputErrors).some(Boolean);
  };

  const getActivePhase = (): keyof Omit<PhaseTypes, "otpCode"> => {
    const entry = (
      Object.entries(phases) as [keyof Omit<PhaseTypes, "otpCode">, value: boolean][]
    ).find(([_, value]) => value === true);
    return entry ? entry[0] : "userEmail";
  };

  let isError = false;

  const startPhaseRequest = async (activePhase: "userEmail" | "recovery") => {
    type inputKey = Exclude<keyof typeof inputValues, "otpCode">;
    const keys: inputKey[] =
      activePhase === "userEmail" ? ["userEmail"] : ["newPassword", "repeatNewPassword"];

    let data = Object.fromEntries(keys.map((k) => [k, inputValues[k]]));

    try {
      const response = await fetch("http://localhost:3000/api/users/reset-password", {
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
      setPhases((prev) => ({ ...prev, otpCode: true }));
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
    if (validationResult) {
      isError = true;
      return;
    }

    startPhaseRequest(getActivePhase());
  };

  return (
    <div className={`reset-password-container ${phases.otpCode ? "animate" : ""}`}>
      <h2>Password Recovery</h2>
      <hr />
      <h3>{phases.otpCode ? "Verify Identify" : "Enter your phone number or email"}</h3>
      <h4
        className={`${phases.otpCode ? "opacityShow" : "opacityHide"}`}
      >{`Code sent to your email: ${inputValues.userEmail}`}</h4>
      <div
        className={`${
          isError ? "isErrorPadding" : "defaultPadding"
        } reset-password-input-container`}
      >
        <FloatingInput
          label={phases.otpCode ? "Enter Code" : "Email"}
          value={`${phases.otpCode ? inputValues.otpCode : inputValues.userEmail}`}
          propsedOnChange={handleValueChange}
          errorMessage={inputErrors.userEmail}
        />
      </div>
      <button onClick={handleSubmit}>{phases.otpCode ? "ENTER NUMBER" : "RECOVER PASSWORD"}</button>
    </div>
  );
}
