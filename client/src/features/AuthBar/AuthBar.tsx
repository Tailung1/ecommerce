import { useState } from "react";
import icon from "../../assets/main-logo.png";
import FloatingInput from "../../shared/FloatingInput";
import RegisterSection from "./RegisterSection";

export default function AuthBar({
  isExiting,
  setIsExiting,
  setShowAuthBar,
}: {
  isExiting: boolean;
  setIsExiting: (value: boolean) => void;
  setShowAuthBar: (value: boolean) => void;
}) {
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
    auth_number: "",
    register_number: "",
  });
  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowAuthBar(false);
      setIsExiting(false);
    }, 800);
  };
  const handleValuesChange = (field: any, value: string) => {
    if (field === "auth_number" || field === "register_number") {
      if (/^[0-9]+$/.test(value)) {
        setInputValues((prev) => ({ ...prev, [field]: value }));
      } else if (value !== "") {
        return;
      }
    }
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };
  const countryCodes = ["995", "242", "927", "315"];
  const EmailAuthIsActive = activeAuthOption !== "number";

  return (
    <div className={`authBar ${isExiting && "exit"}`}>
      <div className='flex flex-col gap-2 w-full relative'>
        <div className='acces-options'>
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
        style={{
          paddingBottom: EmailAuthIsActive ? "20px" : "10px",
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
            active === "auth" ? "Authenticate" : "Regiter"
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
            active === "auth" ? "Authenticate" : "Regiter"
          } with Email`}
        </p>
      </div>

      {activeAuthOption === "number" ? (
        active === "auth" ? (
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
              type='number'
              label={"Enter phone number"}
              value={inputValues.auth_number}
              propsedOnChange={(value) =>
                handleValuesChange("auth_number", value)
              }
            />
          </div>
        ) : (
          <RegisterSection
            inputValues={inputValues}
            handleValuesChange={handleValuesChange}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            countryCodes={countryCodes}
          />
        )
      ) : (
        <div
          style={{
            paddingBottom: EmailAuthIsActive ? "10px" : "20px",
          }}
          className='auth-with-email-container'
        >
          <FloatingInput
            type=''
            label={"Email"}
            propsedOnChange={(value: string) =>
              handleValuesChange("email", value)
            }
            value={inputValues.email}
          />
          <FloatingInput
            type=''
            label={"Password"}
            propsedOnChange={(value: string) =>
              handleValuesChange("password", value)
            }
            value={inputValues.password}
          />
        </div>
      )}
      <section className='submit-section'>
        <button
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
