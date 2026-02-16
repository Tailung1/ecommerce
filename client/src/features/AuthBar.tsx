import { useState } from "react";
import icon from "../assets/main-logo.png";
import checked from "../assets/checked-rules.png";
import unchecked from "../assets/unchecked.png";

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
  const checkIcon = isChecked ? checked : unchecked;

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowAuthBar(false);
      setIsExiting(false);
    }, 800);
  };
  return (
    <div className={`authBar ${isExiting && "exit"}`}>
      <p onClick={handleExit} className='exit-btn'>
        X
      </p>
      <div className='w-full'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='login-options'>
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
              active === "auth" ? "bg-auth" : "bg-register"
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
            <div className='country-code'>+995</div>
            <input placeholder='Phone Number2' />
          </div>
        ) : (
          <div className='register-with-number-container'>
            <div className='register-input'>
              <div className='country-code'>+995</div>
              <input placeholder='Phone Number' />{" "}
            </div>
            {}
            {}
            <div className='policy-container'>
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
          <input placeholder='Phone Number' />
          <input placeholder='Phone Number' />
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
