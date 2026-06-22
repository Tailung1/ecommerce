import "./AuthBar.scss";
import "../../../css/reusable/bar.scss";
import icon from "../../../assets/main-logo.png";
import checked from "../../../assets/checked-rules.png";
import unchecked from "../../../assets/unchecked.png";
import exitBtn from "../../../assets/reject.png";
import useAuthReducer from "../../../reducers/AuthReducer/AuthReducer";
import { useBarDispatch } from "../../../contexts/BarContext";
import ResetPassword from "../reset-password/ResetPassword";
import AuthInputs from "./AuthInputs";
import { useAuthCommands } from "../logic/auth.commands";
import { useBarStateValue } from "../../../contexts/BarContext";
import type { AuthView } from "../../../reducers/AuthReducer/auth-types";

export default function AuthBar() {
  const { authState, authDispatch } = useAuthReducer();
  const { setBar } = useBarDispatch();
  const authCommands = useAuthCommands(authDispatch);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const EmailAuthIsActive = authState.activeAuthOption !== "phone";
  const checkIcon = authState.isChecked ? checked : unchecked;
  const isExitingBar = useBarStateValue("isExitingBar");

  const handleValuesChange = (field: "email" | "password" | "phone", value: string) => {
    if (field === "phone" && value !== "" && !/^[0-9]+$/.test(value)) return;
    authCommands.setInputField(field, value);
  };

  const validateInputs = (
    authOption: "email" | "phone",
    value: { email: string; password: string; phone: string }
  ) => {
    const errors: Partial<{ emailError: string; passwordError: string; phoneError: string }> = {};

    if (authOption === "email") {
      errors.emailError = !value.email
        ? "Can't be empty"
        : !emailRegex.test(authState.inputValues.email)
        ? "Invalid email format"
        : "";
      errors.passwordError = !value.password ? "Can't be empty" : "";
    }
    if (authOption === "phone") {
      errors.phoneError = !value.phone ? "Can't be empty" : "";
    }
    return errors;
  };

  const startAuthRequest = async (authMode: AuthView, activeAuthOption: "email" | "phone") => {
    let actionData = {};
    if (activeAuthOption === "email") {
      actionData = { email: authState.inputValues.email, password: authState.inputValues.password };
    } else {
      actionData = { phone: authState.inputValues.phone };
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/${authMode}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(actionData),
        credentials: "include",
      });

      const result = await response.json();

      console.log(result.message);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    }
  };

  const handleAuth = () => {
    const errors = validateInputs(authState.activeAuthOption, authState.inputValues);
    authDispatch({ type: "SET_ERRORS", payload: errors });
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) return;
    startAuthRequest(authState.authView, authState.activeAuthOption);
  };

  return (
    <>
      {authState.authView === "reset_password" ? (
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
          className={`Bar ${isExitingBar && "ExitBar"}`}
        >
          {" "}
          <img
            src={exitBtn}
            onClick={() => setBar("isExitingBar", true)}
            className='exit-btn w-10 h-8'
            alt='Exit icon'
          />
          <ResetPassword />
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
          <div onClick={authCommands.resetForms} className='flex flex-col gap-2 w-full relative'>
            <div className='acces-options'>
              <img
                src={exitBtn}
                onClick={() => setBar("isExitingBar", true)}
                className='exit-btn w-10 h-8'
                alt='Exit icon'
              />
              <p onClick={() => authDispatch({ type: "SET_AUTH_VIEW", payload: "login" })}>
                Authentication
              </p>
              <p onClick={() => authDispatch({ type: "SET_AUTH_VIEW", payload: "register" })}>
                Register
              </p>
            </div>
            <hr
              className={`auth-hr ${
                authState.authView === "login" ? "bg-login" : "bg-register more-bottom"
              }`}
            />
          </div>
          <div
            onClick={authCommands.resetForms}
            style={{ paddingBottom: EmailAuthIsActive ? "20px" : "15px" }}
            className='auth-option flex gap-2'
          >
            <p
              className={
                authState.activeAuthOption === "phone"
                  ? "active-auth-option"
                  : "non-active-auth-option"
              }
              onClick={() => authDispatch({ type: "SET_AUTH_OPTION", payload: "phone" })}
            >
              {`${authState.authView === "login" ? "Authenticate" : "Register"} with Phone number`}
            </p>
            <p
              className={
                authState.activeAuthOption === "email"
                  ? "active-auth-option"
                  : "non-active-auth-option"
              }
              onClick={() => authDispatch({ type: "SET_AUTH_OPTION", payload: "email" })}
            >
              {`${authState.authView === "login" ? "Authenticate" : "Register"} with Email`}
            </p>
          </div>
          <div className='w-full relative'>
            <AuthInputs
              authState={authState}
              handleValuesChange={handleValuesChange}
              authCommands={authCommands}
            />

            {authState.authView === "register" && (
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
                authState.authView === "register" && !authState.isChecked && "opacity-60"
              }`}
              disabled={authState.authView === "register" && !authState.isChecked}
            >
              {authState.authView === "register"
                ? "REGISTRATION"
                : authState.activeAuthOption === "phone"
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
