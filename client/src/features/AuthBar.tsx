import FloatingInput from "../shared/FloatingInput";
import icon from "../assets/main-logo.png";
import checked from "../assets/checked-rules.png";
import unchecked from "../assets/unchecked.png";
import exitBtn from "../assets/reject.png";
import { useMyContext } from "../MyContext";
import useAuthReducer from "../MyReducer";

export default function AuthBar() {
  const { state, dispatch } = useAuthReducer();
  const { isExitingBar, setIsExitingBar, setShowAuthBar } =
    useMyContext();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const countryCodes = ["995", "242", "927", "315"];
  const EmailAuthIsActive = state.activeAuthOption !== "number";
  const checkIcon = state.isChecked ? checked : unchecked;
  const isEmailError = state.errors.emailError !== "";

  const resetValues = () => {
    dispatch({ type: "RESET_FORM" });
  };

  const handleExit = () => {
    setIsExitingBar(true);
    setTimeout(() => {
      setShowAuthBar(false);
      setIsExitingBar(false);
    }, 600);
  };

  const handleValuesChange = (
    field: "email" | "password" | "number",
    value: string
  ) => {
    if (field === "number" && value !== "" && !/^[0-9]+$/.test(value))
      return;
    dispatch({ type: "SET_INPUT", field, value });
  };

  const handleAuth = () => {
    if (state.activeAuthOption === "email") {
      const emailError = !state.inputValues.email
        ? "Can't be empty"
        : !emailRegex.test(state.inputValues.email)
        ? "Invalid email format"
        : "";
      const passwordError = !state.inputValues.password
        ? "Can't be empty"
        : "";

      dispatch({
        type: "SET_ERRORS",
        payload: { emailError, passwordError },
      });
      return;
    }

    if (state.activeAuthOption === "number") {
      const numberError = !state.inputValues.number
        ? "Can't be empty"
        : "";
      dispatch({ type: "SET_ERRORS", payload: { numberError } });
    }
  };

  return (
    <div className={`Bar ${isExitingBar && "ExitBar"}`}>
      <div
        onClick={resetValues}
        className='flex flex-col gap-2 w-full relative'
      >
        <div className='acces-options'>
          <img
            src={exitBtn}
            onClick={handleExit}
            className='exit-btn w-10 h-8'
            alt='Exit icon'
          />
          <p
            onClick={() =>
              dispatch({ type: "SET_ACTIVE", payload: "auth" })
            }
          >
            Authentication
          </p>
          <p
            onClick={() =>
              dispatch({ type: "SET_ACTIVE", payload: "register" })
            }
          >
            Register
          </p>
        </div>
        <hr
          className={`auth-hr ${
            state.active === "auth"
              ? "bg-auth"
              : "bg-register more-bottom"
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
            state.activeAuthOption === "number"
              ? "active-auth-option"
              : "non-active-auth-option"
          }
          onClick={() =>
            dispatch({ type: "SET_AUTH_OPTION", payload: "number" })
          }
        >
          {`${
            state.active === "auth" ? "Authenticate" : "Register"
          } with Phone number`}
        </p>
        <p
          className={
            state.activeAuthOption === "email"
              ? "active-auth-option"
              : "non-active-auth-option"
          }
          onClick={() =>
            dispatch({ type: "SET_AUTH_OPTION", payload: "email" })
          }
        >
          {`${
            state.active === "auth" ? "Authenticate" : "Register"
          } with Email`}
        </p>
      </div>

      <div className='w-full relative'>
        {state.activeAuthOption === "number" ? (
          <div className='auth-and-register-with-number-container'>
            <div className='country-codes-container'>
              <div
                onClick={() =>
                  dispatch({ type: "TOGGLE_COUNTRY_CODES" })
                }
                className='country-code'
              >
                +{state.currentCode}
              </div>

              {state.showCountryCodes && (
                <div className='codes-wrapper'>
                  {countryCodes.map((code) => (
                    <span
                      key={code}
                      onClick={() =>
                        dispatch({
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
              value={state.inputValues.number}
              propsedOnChange={(value) =>
                handleValuesChange("number", value)
              }
              errorMessage={state.errors.numberError}
            />
          </div>
        ) : (
          <div
            className={`auth-with-email-container ${
              isEmailError ? "emailInputExtraPaddingIN" : ""
            }`}
          >
            <FloatingInput
              label={"Email"}
              value={state.inputValues.email}
              propsedOnChange={(value) =>
                handleValuesChange("email", value)
              }
              errorMessage={state.errors.emailError}
            />
            <FloatingInput
              label={"Password"}
              value={state.inputValues.password}
              propsedOnChange={(value) =>
                handleValuesChange("password", value)
              }
              errorMessage={state.errors.passwordError}
            />
          </div>
        )}

        {state.active === "register" && (
          <div className='policy-container'>
            <img
              onClick={() =>
                dispatch({
                  type: "SET_CHECKED",
                  payload: !state.isChecked,
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
            state.active === "register" &&
            !state.isChecked &&
            "opacity-60"
          }`}
          disabled={state.active === "register" && !state.isChecked}
        >
          {state.active === "register"
            ? "REGISTRATION"
            : state.activeAuthOption === "number"
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
  );
}
