import { useState, useRef, useEffect } from "react";
import icon from "../assets/main-logo.png";

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
  const authBarRef = useRef<HTMLDivElement>(null); // Ref to measure the authBar height
  const [authBarHeight, setAuthBarHeight] = useState<number>(0); // State to hold the height

  // Update the height dynamically based on the content
  useEffect(() => {
    if (authBarRef.current) {
      setAuthBarHeight(authBarRef.current.scrollHeight);
    }
  }, [activeAuthOption, isExiting]); // Recalculate height when content changes

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowAuthBar(false);
      setIsExiting(false);
    }, 500);
  };

  return (
    <div
      ref={authBarRef}
      className={`authBar ${isExiting && "exit"}`}
      style={{ maxHeight: isExiting ? 0 : authBarHeight }} // Dynamically adjust max-height
    >
      <p onClick={handleExit} className='exit-btn'>
        X
      </p>
      <div className='w-full'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='login-options'>
            <p onClick={() => setActive("auth")}>Authentication</p>
            <p onClick={() => setActive("register")}>Register</p>
          </div>
          <hr
            className={`auth-hr ${
              active === "auth" ? "bg-auth" : "bg-register"
            }`}
          />
        </div>
      </div>
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
      {activeAuthOption === "number" ? (
        <div className='auth-with-number-container'>
          <div className='country-code'>+995</div>
          <input placeholder='Phone Number' />
        </div>
      ) : (
        <div className='auth-with-email-container'>
          <input placeholder='Email' />
          <input placeholder='Confirm Email' />
        </div>
      )}
      <section className='submit-section'>
        <button className='submit-btn'>
          {activeAuthOption === "number" ? "SEND CODE" : "LOG IN"}
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
