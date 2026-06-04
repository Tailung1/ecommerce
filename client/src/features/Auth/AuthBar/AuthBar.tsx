import "./AuthBar.scss";
import "../../../css/reusable/bar.scss";
import icon from "../../../assets/main-logo.png";
import checked from "../../../assets/checked-rules.png";
import unchecked from "../../../assets/unchecked.png";
import exitBtn from "../../../assets/reject.png";
import useAuthReducer from "../../../AuthReducer";
import { useBarStateValue } from "../../../contexts/BarContext";
import { useBarDispatch } from "../../../contexts/BarContext";
import ResetPassword from "../ResetPassword/ResetPassword";
import { useState } from "react";
import AuthInputs from "../AuthInputs/AuthInputs";

export default function AuthBar() {
  const { authState, authDispatch } = useAuthReducer();
  const { setBar } = useBarDispatch();
  const [otpPhase, setOtpPhase] = useState<boolean>(false);
  const isExitingBar = useBarStateValue("isExitingBar");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const EmailAuthIsActive = authState.activeAuthOption !== "number";
  const checkIcon = authState.isChecked ? checked : unchecked;

  const authCommands = {
    ToggleCountryCodes: () => authDispatch({ type: "TOGGLE_COUNTRY_CODES" }),
    SelectCountryCode: (code: string) =>
      authDispatch({ type: "SET_COUNTRY_CODE", payload: code }),

    EnablePasswordReset: () => authDispatch({ type: "ENABLE_PASSWORD_RESET", payload: true }),
  };

  const handleValuesChange = (field: "email" | "password" | "number", value: string) => {
    if (field === "number" && value !== "" && !/^[0-9]+$/.test(value)) return;
    authDispatch({ type: "SET_INPUT", field, value });
  };

  const resetValues = () => {
    authDispatch({ type: "RESET_FORM" });
  };

  const validateInputs = (
    authOption: "email" | "number",
    value: { email: string; password: string; number: string }
  ) => {
    const errors: Partial<{ emailError: string; passwordError: string; numberError: string }> = {};

    if (authOption === "email") {
      errors.emailError = !value.email
        ? "Can't be empty"
        : !emailRegex.test(authState.inputValues.email)
        ? "Invalid email format"
        : "";
      errors.passwordError = !value.password ? "Can't be empty" : "";
    }
    if (authOption === "number") {
      errors.numberError = !value.number ? "Can't be empty" : "";
    }
    return errors;
  };

  const startAuthRequest = (authMode: string, activeAuthOption: string) => {};

  const handleAuth = () => {
    const errors = validateInputs(authState.activeAuthOption, authState.inputValues);
    authDispatch({type:"SET_ERRORS",payload:errors})
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) return;
    startAuthRequest(authState.activeMode, authState.activeAuthOption);
  };

  return (
    <>
      {authState.enablePasswordReset ? (
        <div
          key='reset'
          onAnimationEnd={(e) => {
            // Checking isExitingBar is redundant in this case,
            // but useful if there are multiple animations on this element.
            if (isExitingBar && e.animationName === "BarOut") {
              setBar("showAuthBar", false);
              setBar("isExitingBar", false);
            }
          }}
          className={`Bar ${isExitingBar && "ExitBar"} ${otpPhase ? "animateForPassRecovery" : ""}`}
        >
          {" "}
          <img
            src={exitBtn}
            onClick={() => setBar("isExitingBar", true)}
            className='exit-btn w-10 h-8'
            alt='Exit icon'
          />
          <ResetPassword otpPhase={otpPhase} setOtpPhase={setOtpPhase} />
        </div>
      ) : (
        <div
          key='auth'
          onAnimationEnd={(e) => {
            if (isExitingBar && e.animationName === "BarOut") {
              setBar("showAuthBar", false);
              setBar("isExitingBar", false);
            }
          }}
          className={`Bar ${isExitingBar && "ExitBar"}`}
        >
          {" "}
          <div onClick={resetValues} className='flex flex-col gap-2 w-full relative'>
            <div className='acces-options'>
              <img
                src={exitBtn}
                onClick={() => setBar("isExitingBar", true)}
                className='exit-btn w-10 h-8'
                alt='Exit icon'
              />
              <p onClick={() => authDispatch({ type: "SET_ACTIVE", payload: "auth" })}>
                Authentication
              </p>
              <p onClick={() => authDispatch({ type: "SET_ACTIVE", payload: "register" })}>
                Register
              </p>
            </div>
            <hr
              className={`auth-hr ${
                authState.activeMode === "auth" ? "bg-auth" : "bg-register more-bottom"
              }`}
            />
          </div>
          <div
            onClick={resetValues}
            style={{ paddingBottom: EmailAuthIsActive ? "20px" : "15px" }}
            className='auth-options flex gap-2'
          >
            <p
              className={
                authState.activeAuthOption === "number"
                  ? "active-auth-option"
                  : "non-active-auth-option"
              }
              onClick={() => authDispatch({ type: "SET_AUTH_OPTION", payload: "number" })}
            >
              {`${authState.activeMode === "auth" ? "Authenticate" : "Register"} with Phone number`}
            </p>
            <p
              className={
                authState.activeAuthOption === "email"
                  ? "active-auth-option"
                  : "non-active-auth-option"
              }
              onClick={() => authDispatch({ type: "SET_AUTH_OPTION", payload: "email" })}
            >
              {`${authState.activeMode === "auth" ? "Authenticate" : "Register"} with Email`}
            </p>
          </div>
          <div className='w-full relative'>
            <AuthInputs
              authState={authState}
              handleValuesChange={handleValuesChange}
              authCommands={authCommands}
            />

            {authState.activeMode === "register" && (
              <div className='policy-container'>
                <img
                  onClick={() =>
                    authDispatch({
                      type: "SET_CHECKED",
                      payload: !authState.isChecked,
                    })
                  }
                  className='w-8 h-6'
                  src={checkIcon}
                  alt='checked icon'
                />
                <p className='text-[15px]'>
                  Read and agree to the{" "}
                  <span className='text-orange-500'>
                    rules, conditions and personal data protection policy
                  </span>
                </p>
              </div>
            )}
          </div>
          <section className='submit-section'>
            <button
              onClick={handleAuth}
              className={`submit-btn ${
                authState.activeMode === "register" && !authState.isChecked && "opacity-60"
              }`}
              disabled={authState.activeMode === "register" && !authState.isChecked}
            >
              {authState.activeMode === "register"
                ? "REGISTRATION"
                : authState.activeAuthOption === "number"
                ? "SEND CODE"
                : "LOG IN"}
            </button>
            <hr />
            <p className='font-bold'>Or log in with other method</p>
            <button className='google-btn'>
              <img className='google-icon' src={icon} />
            </button>
          </section>
        </div>
      )}
    </>
  );
}
