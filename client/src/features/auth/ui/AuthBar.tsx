import "./AuthBar.scss";
import "../../../css/reusable/bar.scss";
import icon from "../../../assets/main-logo.png";
import checked from "../../../assets/checked-rules.png";
import unchecked from "../../../assets/unchecked.png";
import exitBtn from "../../../assets/reject.png";
import useAuthReducer from "../auth.reducer";
import { useBarDispatch } from "../../../contexts/BarContext";
import ResetPassword from "../reset-password/ResetPassword";
import AuthInputs from "./AuthInputs";
import { useAuthCommands } from "../auth.commands";
import { useBarStateValue } from "../../../contexts/BarContext";
import {
  validateInputs,
  handleValuesChange,
  getRequestData,
  startAuthRequest,
} from "../auth.service";

export default function AuthBar() {
  const { authState, authDispatch } = useAuthReducer();
  const { setBar } = useBarDispatch();
  const authCommands = useAuthCommands(authDispatch);
  const EmailAuthIsActive = authState.activeAuthOption !== "phone";
  const checkIcon = authState.isChecked ? checked : unchecked;
  const isExitingBar = useBarStateValue("isExitingBar");

  const handleAuth = () => {
    const errors = validateInputs(authState, authState.activeAuthOption, authState.inputValues);
    authDispatch({ type: "SET_ERRORS", payload: errors });
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) return;
    const requestData = getRequestData(authState);
    startAuthRequest(authState.authView, requestData);
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
