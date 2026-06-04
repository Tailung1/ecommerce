import FloatingInput from "../../../components/reusable/FloatingInput";

interface AuthInputsProps {
  authState: {
    activeMode: "auth" | "register";
    activeAuthOption: "number" | "email";
    inputValues: { email: string; password: string; number: string };
    errors: { emailError: string; passwordError: string; numberError: string };
    currentCode: string;
    showCountryCodes: boolean;
  };
  handleValuesChange: (field: "email" | "password" | "number", value: string) => void;
  authCommands: {
    onToggleCountryCodes: () => void;
    onSelectCountryCode: (code: string) => void;
    onEnablePasswordReset: () => void;
  };
}

export default function ({ authState, handleValuesChange, authCommands }: AuthInputsProps) {
  const countryCodes = ["995", "242", "927", "315"];
  const isEmailError = authState.errors.emailError !== "";

  const onForgotPasswordClick = () => {
    authCommands.onEnablePasswordReset();
  };

  return (
    <div>
      {authState.activeAuthOption === "number" ? (
        <div className='auth-and-register-with-number-container'>
          <div className='country-codes-container'>
            <div onClick={authCommands.onToggleCountryCodes} className='country-code'>
              +{authState.currentCode}
            </div>

            {authState.showCountryCodes && (
              <div className='codes-wrapper'>
                {countryCodes.map((code) => (
                  <span key={code} onClick={() => authCommands.onSelectCountryCode(code)}>
                    +{code}
                  </span>
                ))}
              </div>
            )}
          </div>
          <FloatingInput
            label={"Phone number"}
            value={authState.inputValues.number}
            propsedOnChange={(value) => handleValuesChange("number", value)}
            errorMessage={authState.errors.numberError}
            active={authState.activeMode}
          />
        </div>
      ) : (
        <div className={`auth-with-email-container ${isEmailError ? "emailContainerGapIN" : ""}`}>
          <FloatingInput
            label={"Email"}
            value={authState.inputValues.email}
            propsedOnChange={(value) => handleValuesChange("email", value)}
            errorMessage={authState.errors.emailError}
            active={authState.activeMode}
          />
          <FloatingInput
            label={"Password"}
            value={authState.inputValues.password}
            propsedOnChange={(value) => handleValuesChange("password", value)}
            errorMessage={authState.errors.passwordError}
            active={authState.activeMode}
            onForgotPasswordClick={onForgotPasswordClick}
          />
        </div>
      )}
    </div>
  );
}
