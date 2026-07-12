import { motion } from "framer-motion";
import { useState } from "react";
import type { AuthView } from "../../features/auth/authTypes";
import { Eye, EyeOff } from "lucide-react";
import "./FloatingInput.scss";

interface propsTypes {
  label: string;
  value: string;
  propsedOnChange: (value: string) => void;
  errorMessage: string;
  activeView?: AuthView;
  onForgotPasswordClick?: () => void;
  inputTypePassword?: "password";
}

export default function FloatingInput({
  label,
  value,
  propsedOnChange,
  errorMessage,
  activeView,
  onForgotPasswordClick,
  inputTypePassword,
}: propsTypes) {
  const [activityTrack, setActivityTrack] = useState({
    isFocused: false,
    // hasValue: false,  not Necessary YET.
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const hasError = errorMessage !== "";
  const isActive = activityTrack.isFocused || value.length > 0;
  const inputId = `${label}-${activeView}`.toLowerCase().replace(" ", "-");

  return (
    <div className='floating-container'>
      <motion.label
        className={`${isActive && "text-orange-500"} floating-label`}
        initial={{ x: 0, y: 15 }}
        animate={{
          y: isActive ? 0 : 15,
          scale: isActive ? 0.8 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        htmlFor={inputId}
      >
        {label}
      </motion.label>
      <div className='flex items-center'>
        <input
          id={inputId}
          className={hasError ? "border border-red-500" : "border border-white"}
          value={value}
          onChange={(e) => propsedOnChange(e.target.value)}
          onFocus={() => setActivityTrack((prev) => ({ ...prev, isFocused: true }))}
          onBlur={() => setActivityTrack((prev) => ({ ...prev, isFocused: false }))}
          type={inputTypePassword && showPassword ? "password" : "text"}
        />
        {inputTypePassword && (
          <button className='eye-btn' onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      <div className='input-feedback'>
        <span>{hasError ? errorMessage : ""}</span>
        <span onClick={onForgotPasswordClick}>
          {label === "Password" && activeView === "login" ? "Forgot Password" : ""}
        </span>
      </div>
    </div>
  );
}
