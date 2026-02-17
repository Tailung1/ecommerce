import { useState } from "react";
import icon from "../assets/main-logo.png";
import checked from "../assets/checked-rules.png";
import unchecked from "../assets/unchecked.png";
import FloatingInput from "../shared/FloatingInput";

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
  const [currentCode, setCurrentCode] = useState<string>("+995");

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    auth_number: "",
    register_number: "",
  });
  const checkIcon = isChecked ? checked : unchecked;
  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowAuthBar(false);
      setIsExiting(false);
    }, 800);
  };
  const handleValuesChange = (field: any, value: string) => {
    if (field === "auth_number" || "register_number") {
      if (/^[0-9]+$/.test(value)) {
        setInputValues((prev) => ({ ...prev, [field]: value }));
      } else {
        return;
      }
    }
    setInputValues((prev) => ({ ...prev, [field]: value }));
  };
  const [countryCodes, setCountryCodes] = useState([
    "995",
    "242",
    "927",
    "315",
  ]);
  return (
    <div className={`authBar ${isExiting && "exit"}`}>
      <p onClick={handleExit} className='exit-btn'>
        X
      </p>
      <div className='w-full'>
        <div className='flex flex-col gap-2 w-full'>
          <div
            className={`login-options ${
              active === "register" && "pb-1"
            }`}
          >
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
              active === "auth"
                ? "bg-auth"
                : "bg-register more-bottom"
            }`}
          />
        </div>
      </div>

      {active === "auth" && (
        <div className='auth-options flex gap-2'>
          <p
            className={`${
              activeAuthOption === "number"
                ? "active-auth-option"
                : "non-active-auth-option "
            }`}
            onClick={() => setActiveAuthOption("number")}
          >
            Authenticate with Phone Number
          </p>
          <p
            className={`${
              activeAuthOption === "email"
                ? "active-auth-option"
                : "non-active-auth-option"
            }`}
            onClick={() => setActiveAuthOption("email")}
          >
            Authenticate with Email
          </p>
        </div>
      )}
      {activeAuthOption === "number" ? (
        active === "auth" ? (
          <div className='auth-with-number-container'>
            <div className='country-code-container relative flex flex-col gap-1'>
              <div
                onClick={() => setShowCountryCodes((prev) => !prev)}
                className='country-code'
              >
             {currentCode}
              </div>
              <div className='codes-wrapper'>
                {showCountryCodes &&
                  countryCodes.map((code) => (
                    <span
                      onClick={() => {
                        setShowCountryCodes(false);
                        setCurrentCode(code)
                      }}
                      key={code}
                    >
                      +{code}
                    </span>
                  ))}
              </div>
            </div>
            <FloatingInput
              label={"Enter phone number"}
              value={inputValues.auth_number}
              propsedOnChange={(value) =>
                handleValuesChange("auth_number", value)
              }
            />
          </div>
        ) : (
          <div className='register-with-number-container'>
            <div className='register-input'>
              {/* <div className='relative '> */}{" "}
              <div
                onClick={() => setShowCountryCodes(true)}
                className='country-code'
              >
                +995
              </div>
              {/* <div className='flex flex-col gap-2 '>
                  {!showCountryCodes &&
                    countryCodes.map((code) => (
                      <span key={code}>{code}</span>
                    ))}
                </div> */}
              {/* </div>{" "} */}
              <FloatingInput
                label={"Enter phone number"}
                propsedOnChange={(value: string) =>
                  handleValuesChange("register_number", value)
                }
                value={inputValues.register_number}
              />
            </div>
            {}
            {}
            <div
              className={`policy-container ${
                active === "register" && "more-padding"
              }`}
            >
              <img
                onClick={() => setIsChecked((prev) => !prev)}
                className='w-8 max-h-5'
                src={checkIcon}
                alt='checked icon'
              />

              <p className='text-[15px]'>
                Read and agree to the{" "}
                <span className='text-orange-500'>
                  rules, conditions and personal data protection
                  policy
                </span>
              </p>
            </div>

            {}
            {}
          </div>
        )
      ) : (
        <div className='auth-with-email-container'>
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
