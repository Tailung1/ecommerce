import "./AuthBar.scss";
import "../../../css/reusable/bar.scss";
import FloatingInput from "../../../components/reusable/FloatingInput";
import icon from "../../../assets/main-logo.png";
import checked from "../../../assets/checked-rules.png";
import unchecked from "../../../assets/unchecked.png";
import exitBtn from "../../../assets/reject.png";
import useAuthReducer from "../../../AuthReducer";
import { useBarStateValue } from "../../../contexts/BarContext";
import { useBarDispatch } from "../../../contexts/BarContext";
import ResetPassword from "../ResetPassword/ResetPassword";
import { useState } from "react";

export default function AuthBar() {
  const { authState, authDispatch } = useAuthReducer();
  const { setBar } = useBarDispatch();
    const [otpPhase, setOtpPhase] = useState<boolean>(false);
  const isExitingBar = useBarStateValue("isExitingBar");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const countryCodes = ["995", "242", "927", "315"];
  const EmailAuthIsActive = authState.activeAuthOption !== "number";
  const checkIcon = authState.isChecked ? checked : unchecked;
  const isEmailError = authState.errors.emailError !== "";

  const onForgotPasswordClick = () => {
    authDispatch({ type: "ENABLE_PASSWORD_RESET", payload: true });
  };

  const resetValues = () => {
    authDispatch({ type: "RESET_FORM" });
  };

  const handleValuesChange = (field: "email" | "password" | "number", value: string) => {
    if (field === "number" && value !== "" && !/^[0-9]+$/.test(value)) return;
    authDispatch({ type: "SET_INPUT", field, value });
  };

  const handleAuth = () => {
    if (authState.activeAuthOption === "email") {
      const emailError = !authState.inputValues.email
        ? "Can't be empty"
        : !emailRegex.test(authState.inputValues.email)
        ? "Invalid email format"
        : "";
      const passwordError = !authState.inputValues.password ? "Can't be empty" : "";

      authDispatch({
        type: "SET_ERRORS",
        payload: { emailError, passwordError },
      });
      return;
    }

    if (authState.activeAuthOption === "number") {
      const numberError = !authState.inputValues.number ? "Can't be empty" : "";
      authDispatch({ type: "SET_ERRORS", payload: { numberError } });
    }
  };

  return (
    <>
      {authState.enablePasswordReset ? (
        <div
          key="reset"
          onAnimationEnd={(e) => {
            // Checking isExitingBar is redundant in this case,
            // but useful if there are multiple animations on this element.
            if (isExitingBar && e.animationName === "BarOut") {
              setBar("showAuthBar", false);
              setBar("isExitingBar", false);
            }
          }}
          className={`Bar ${isExitingBar && "ExitBar"} ${otpPhase?"animateForPassRecovery":""}`}
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
            // Checking isExitingBar is redundant in this case,
            // but useful if there are multiple animations on this element.
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
                authState.active === "auth" ? "bg-auth" : "bg-register more-bottom"
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
              {`${authState.active === "auth" ? "Authenticate" : "Register"} with Phone number`}
            </p>
            <p
              className={
                authState.activeAuthOption === "email"
                  ? "active-auth-option"
                  : "non-active-auth-option"
              }
              onClick={() => authDispatch({ type: "SET_AUTH_OPTION", payload: "email" })}
            >
              {`${authState.active === "auth" ? "Authenticate" : "Register"} with Email`}
            </p>
          </div>
          <div className='w-full relative'>
            {authState.activeAuthOption === "number" ? (
              <div className='auth-and-register-with-number-container'>
                <div className='country-codes-container'>
                  <div
                    onClick={() => authDispatch({ type: "TOGGLE_COUNTRY_CODES" })}
                    className='country-code'
                  >
                    +{authState.currentCode}
                  </div>

                  {authState.showCountryCodes && (
                    <div className='codes-wrapper'>
                      {countryCodes.map((code) => (
                        <span
                          key={code}
                          onClick={() =>
                            authDispatch({
                              type: "SET_COUNTRY_CODE",
                              payload: code,
                            })
                          }
                        >
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
                  active={authState.active}
                />
              </div>
            ) : (
              <div
                className={`auth-with-email-container ${isEmailError ? "emailContainerGapIN" : ""}`}
              >
                <FloatingInput
                  label={"Email"}
                  value={authState.inputValues.email}
                  propsedOnChange={(value) => handleValuesChange("email", value)}
                  errorMessage={authState.errors.emailError}
                  active={authState.active}
                />
                <FloatingInput
                  label={"Password"}
                  value={authState.inputValues.password}
                  propsedOnChange={(value) => handleValuesChange("password", value)}
                  errorMessage={authState.errors.passwordError}
                  active={authState.active}
                  onForgotPasswordClick={onForgotPasswordClick}
                />
              </div>
            )}

            {authState.active === "register" && (
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
                authState.active === "register" && !authState.isChecked && "opacity-60"
              }`}
              disabled={authState.active === "register" && !authState.isChecked}
            >
              {authState.active === "register"
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
