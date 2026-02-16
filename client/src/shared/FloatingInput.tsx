import { motion } from "framer-motion";
import { useState } from "react";

export default function FloatingInput({ label }: { label: string }) {
  //   const inputData = {
  //     mail: "",
  //     password: "",
  //   };
  const [activityTrack, setActivityTrack] = useState({
    isFocused: false,
    hasValue: false,
  });
  const isActive = activityTrack.isFocused || activityTrack.hasValue;

  return (
    <div className='floating-container'>
      <motion.label
      className={`${isActive && "text-orange-500"}`}
        animate={{
          y: isActive ? 0 : 15,
          x: isActive ? 8 : 15,
          scale: isActive ? 0.8 : 1,
        }}
        transition={{ duration: 0.2,ease:"easeInOut"}}
        htmlFor=''
      >
        {label}
      </motion.label>
      <input
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
