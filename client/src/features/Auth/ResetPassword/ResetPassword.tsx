import "./ResetPassword.scss";
import { useState } from "react";
import FloatingInput from "../../../components/reusable/FloatingInput";

export default function ResetPassword() {
  const [value, setValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleValueChange = (v: string) => {
    setValue(v);
    if (v.length > 4) setErrorMessage("");
  };

  const hanldeSubmit = () => {
    if (value.length < 5) setErrorMessage("Min 5 charachters required");
  };
  const isError = errorMessage.length !== 0;
  return (
    <div className='reset-password-container'>
      <h2>Password Recovery</h2>
      <hr />
      <h3>Enter your phone number or email</h3>
      <div className={`${isError ? "isErrorPadding" : "defaultPadding"} reset-password-input-container`}>
        <FloatingInput
          label='Email'
          value={value}
          propsedOnChange={handleValueChange}
          errorMessage={errorMessage}
        />
      </div>
      <button onClick={hanldeSubmit}>RECOVER PASSWORD</button>
    </div>
  );
}
