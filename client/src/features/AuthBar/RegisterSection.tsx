import { useState, type SetStateAction } from "react";
import FloatingInput from "../../shared/FloatingInput";
import checked from "../../assets/checked-rules.png";
import unchecked from "../../assets/unchecked.png";

export default function RegisterSection({
  active,
  inputValues,
  handleValuesChange,
  isChecked,
  setIsChecked,
}: {
  active: string;
  inputValues: {
    email: string;
    password: string;
    auth_number: string;
    register_number: string;
  };
  handleValuesChange: (arg1: string, arg2: string) => void;
  isChecked: boolean;
  setIsChecked: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [showCountryCodes, setShowCountryCodes] =
    useState<boolean>(false);
  const checkIcon = isChecked ? checked : unchecked;

  return (
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
            rules, conditions and personal data protection policy
          </span>
        </p>
      </div>

      {}
      {}
    </div>
  );
}
