import FloatingInput from "../../../components/reusable/FloatingInput";
import "./AuthInputs.scss";

interface AuthInputsProps {
  authState: {
    authView: "login" | "register";
    activeAuthOption: "phone" | "email";
    inputValues: { email: string; password: string; phone: string };
    errors: { emailError: string; passwordError: string; phoneError: string };
    currentCode: string;
    showCountryCodes: boolean;
  };
  handleValuesChange: (field: "email" | "password" | "phone", value: string) => void;
  authCommands: {
    resetForms: () => void;
    toggleCountryCodes: () => void;
    selectCountryCode: (code: string) => void;
    enablePasswordReset: () => void;
  };
}

export default function ({ authState, handleValuesChange, authCommands }: AuthInputsProps) {
  const countryCodes = ["995", "242", "927", "315"];
  const isEmailError = authState.errors.emailError !== "";

  const onForgotPasswordClick = () => {
    authCommands.enablePasswordReset();
  };

  return (
    <div>
      {authState.activeAuthOption === "phone" ? (
        <div className='auth-and-register-with-phone-container'>
          <div className='country-codes-container'>
            <div onClick={authCommands.toggleCountryCodes} className='country-code'>
              +{authState.currentCode}
            </div>

            {authState.showCountryCodes && (
              <div className='codes-wrapper'>
                {countryCodes.map((code) => (
                  <span key={code} onClick={() => authCommands.selectCountryCode(code)}>
                    +{code}
                  </span>
                ))}
              </div>
            )}
          </div>
          <FloatingInput
            label={"Phone number"}
            value={authState.inputValues.phone}
            propsedOnChange={(value) => handleValuesChange("phone", value)}
            errorMessage={authState.errors.phoneError}
            active={authState.authView}
          />
        </div>
      ) : (
        <div className={`auth-with-email-container ${isEmailError ? "emailContainerGapIN" : ""}`}>
          <FloatingInput
            label={"Email"}
            value={authState.inputValues.email}
            propsedOnChange={(value) => handleValuesChange("email", value)}
            errorMessage={authState.errors.emailError}
            active={authState.authView}
          />
          <FloatingInput
            label={"Password"}
            value={authState.inputValues.password}
            propsedOnChange={(value) => handleValuesChange("password", value)}
            errorMessage={authState.errors.passwordError}
            active={authState.authView}
            onForgotPasswordClick={onForgotPasswordClick}
          />
        </div>
      )}
    </div>
  );
}
