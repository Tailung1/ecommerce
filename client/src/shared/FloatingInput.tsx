import { motion } from "framer-motion";
import { useState } from "react";

interface propsTypes {
  type: string;
  label: string;
  value: string;
  propsedOnChange: (value: string) => void;
}

export default function FloatingInput({
  type,
  label,
  value,
  propsedOnChange,
}: propsTypes) {
  const [activityTrack, setActivityTrack] = useState({
    isFocused: false,
    hasValue: false,
  });

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
        onChange={(e) => propsedOnChange(e.target.value)}
        onFocus={() =>
          setActivityTrack((prev) => ({ ...prev, isFocused: true }))
        }
        onBlur={() =>
          setActivityTrack((prev) => ({ ...prev, isFocused: false }))
        }
        type={type === "number" ? "number" : "text"}
      />
    </div>
  );
}
