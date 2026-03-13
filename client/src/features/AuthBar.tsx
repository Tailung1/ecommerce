import { useState } from "react";
import FloatingInput from "../shared/FloatingInput";
import icon from "../assets/main-logo.png";
import checked from "../assets/checked-rules.png";
import unchecked from "../assets/unchecked.png";
import { useMyContext } from "../MyContext";

export default function AuthBar() {
  const { isExitingBar, setIsExitingBar, setShowAuthBar } =
    useMyContext();
  const [active, setActive] = useState<string>("auth");
  const [activeAuthOption, setActiveAuthOption] =
    useState<string>("number");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showCountryCodes, setShowCountryCodes] =
    useState<boolean>(false);
  const [currentCode, setCurrentCode] = useState<string>("995");

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    number: "",
  });
  const resetValues = () => {
    setInputValues({
      email: "",
      password: "",
      number: "",
    });
    setShowCountryCodes(false);
  };
  const handleExit = () => {
    setIsExitingBar(true);
    setTimeout(() => {
      setShowAuthBar(false);
      setIsExitingBar(false);
    }, 600);
  };
  const handleValuesChange = (field: any, value: string) => {
    if (field === "number") {
      if (/^[0-9]+$/.test(value)) {
        setInputValues((prev) => ({ ...prev, [field]: value }));
        return;
      } else if (value !== "") {
        return;
      }
    }
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAuth = () => {
    console.log(inputValues);
  };

  const countryCodes = ["995", "242", "927", "315"];
  const EmailAuthIsActive = activeAuthOption !== "number";
  const checkIcon = isChecked ? checked : unchecked;

  return (
    <div className={`Bar ${isExitingBar && "ExitBar"}`}>
      <div className='flex flex-col gap-2 w-full relative'>
        <div onClick={resetValues} className='acces-options'>
          <p onClick={handleExit} className='exit-btn'>
            X
          </p>
          <p onClick={() => setActive("auth")}>Authentication</p>
          <p
            onClick={() => {
              setActive("register");
              setActiveAuthOption("number");
            }}
          >
            Register
          </p>
        </div>
        <hr
          className={`auth-hr ${
            active === "auth" ? "bg-auth" : "bg-register more-bottom "
          }`}
        />
      </div>

      <div
        onClick={resetValues}
        style={{
          paddingBottom: EmailAuthIsActive ? "20px" : "15px",
        }}
        className='auth-options flex gap-2'
      >
        <p
          className={`${
            activeAuthOption === "number"
              ? "active-auth-option"
              : "non-active-auth-option "
          }`}
          onClick={() => setActiveAuthOption("number")}
        >
          {`${
            active === "auth" ? "Authenticate" : "Register"
          } with Phone number`}
        </p>
        <p
          className={`${
            activeAuthOption === "email"
              ? "active-auth-option"
              : "non-active-auth-option"
          }`}
          onClick={() => setActiveAuthOption("email")}
        >
          {`${
            active === "auth" ? "Authenticate" : "Register"
          } with Email`}
        </p>
      </div>

      <div className='w-full'>
        {activeAuthOption === "number" ? (
          <div className='auth-and-register-with-number-container'>
            <div className='country-codes-container'>
              <div
                onClick={() => setShowCountryCodes((prev) => !prev)}
                className='country-code'
              >
                +{currentCode}
              </div>

              {showCountryCodes && (
                <div className='codes-wrapper'>
                  {countryCodes.map((code) => (
                    <span
                      onClick={() => {
                        setShowCountryCodes(false);
                        setCurrentCode(code);
                      }}
                      key={code}
                    >
                      +{code}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <FloatingInput
              label={"Enter phone number"}
              value={inputValues.number}
              propsedOnChange={(value) =>
                handleValuesChange("number", value)
              }
            />
          </div>
        ) : (
          <div
            style={{
              paddingBottom: EmailAuthIsActive ? "10px" : "20px",
            }}
            className='auth-with-email-container'
          >
            <FloatingInput
              label={"Email"}
              propsedOnChange={(value: string) =>
                handleValuesChange("email", value)
              }
              value={inputValues.email}
            />
            <FloatingInput
              label={"Password"}
              propsedOnChange={(value: string) =>
                handleValuesChange("password", value)
              }
              value={inputValues.password}
            />
          </div>
        )}
        {active === "register" && (
          <div className='policy-container'>
            <img
              onClick={() => setIsChecked((prev) => !prev)}
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
            active === "register" && !isChecked && " opacity-60"
          }`}
          disabled={!isChecked}
        >
          {active === "register"
            ? "REGISTRATION"
            : activeAuthOption === "number"
            ? "SEND CODE"
            : "LOG IN"}
        </button>
        <hr />
        <p className='font-bold'>Or log in with other method</p>
        <button className='google-btn'>
          <img className='google-icon ' src={icon} />
        </button>
      </section>
    </div>
  );
}
