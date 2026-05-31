import { motion } from "framer-motion";
import { useState } from "react";

interface propsTypes {
  label: string;
  value: string;
  propsedOnChange: (value: string) => void;
  errorMessage: string;
  active: "auth" | "register";
  authDispatch:React.Dispatch<authActionTypes>
}

export default function FloatingInput({
  label,
  value,
  propsedOnChange,
  errorMessage,
  active,
  authDispatch,
}: propsTypes) {
  const [activityTrack, setActivityTrack] = useState({
    isFocused: false,
    // hasValue: false,  not Necessary YET.
  });

  const hasError = errorMessage !== "";
  const isActive = activityTrack.isFocused || value;
  const inputId = `${label.toLowerCase().replace(" ", "-")}-input`;
  return (
    <div className='floating-container'>
      <motion.label
        className={`${isActive && "text-orange-500"}`}
        initial={{ x: 8, y: 15 }}
        animate={{
          y: isActive ? 0 : 15,
          x: isActive ? 2 : 8,
          scale: isActive ? 0.8 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        htmlFor={inputId}
      >
        {label}
      </motion.label>
      <input
        id={inputId}
        className={hasError ? "border border-red-500" : "border border-white"}
        value={value}
        onChange={(e) => propsedOnChange(e.target.value)}
        onFocus={() => setActivityTrack((prev) => ({ ...prev, isFocused: true }))}
        onBlur={() => setActivityTrack((prev) => ({ ...prev, isFocused: false }))}
        type='text'
      />
      <div className='input-feedback'>
        <span>{hasError ? errorMessage : ""}</span>
        <span onClick={() => authDispatch({ type: "ENABLE_PASSWORD_RESET", payload: true })}>
          {label === "Password" && active === "auth" ? "Forgot Password" : ""}
        </span>
      </div>
    </div>
  );
}
