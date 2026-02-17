import { motion } from "framer-motion";
import { useState } from "react";

interface propsTypes {
  label: string;
  value: string;
  propsedOnChange: (value: string) => void;
}

export default function FloatingInput({
  label,
  value,
  propsedOnChange,
}: propsTypes) {
  const [activityTrack, setActivityTrack] = useState({
    isFocused: false,
    hasValue: false,
  });
  const isActive = activityTrack.isFocused || value;

  return (
    <div className='floating-container'>
      <motion.label
        className={`${isActive && "text-orange-500"}`}
        initial={{x:8,y:15}}
        animate={{
          y: isActive ? 0 : 15,
          x: isActive ? 2 : 8,

          scale: isActive ? 0.8 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        htmlFor=''
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
        type='text'
      />
    </div>
  );
}
