import "./ResetPassword.scss";
import { useState } from "react";
import FloatingInput from "../../../components/reusable/FloatingInput";

export default function ResetPassword({
  otpPhase,
  setOtpPhase,
}: {
  otpPhase: boolean;
  setOtpPhase: React.Dispatch<boolean>;
}) {
  const [value, setValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
//   const [otp, setOtp] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("ramaz11");

  const handleValueChange = (v: string) => {
    setValue(v);
    if (v.length > 4) setErrorMessage("");
    setUserEmail("") // temporary
  };

  const hanldeSubmit = () => {
    if (value.length < 5) setErrorMessage("Min 5 charachters required");
    setOtpPhase(true);
    setValue("");
    setErrorMessage("");
  };
  const isError = errorMessage.length !== 0;
  return (
    <div className={`reset-password-container ${otpPhase ? "animate" : ""}`}>
      <h2>Password Recovery</h2>
      <hr />
      <h3>{otpPhase ? "Verify Identify" : "Enter your phone number or email"}</h3>
      <h4
        className={`${otpPhase ? "opacityShow" : "opacityHide"}`}
      >{`Code sent to your email: ${userEmail}`}</h4>
      <div
        className={`${
          isError ? "isErrorPadding" : "defaultPadding"
        } reset-password-input-container`}
      >
        <FloatingInput
          label={otpPhase ? "Enter Code" : "Email"}
          value={value}
          propsedOnChange={handleValueChange}
          errorMessage={errorMessage}
        />
      </div>
      <button onClick={hanldeSubmit}>RECOVER PASSWORD</button>
    </div>
  );
}
