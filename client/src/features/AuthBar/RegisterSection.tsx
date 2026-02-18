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
  countryCodes,
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
  countryCodes:string[]
}) {
  const [showCountryCodes, setShowCountryCodes] =
    useState<boolean>(false);
  const [currentCode, setCurrentCode] = useState<string>("995");
  const checkIcon = isChecked ? checked : unchecked;

  return (
    <div className='register-with-number-container'>
      <div className='auth-and-register-with-number-container'>
        <div
          onClick={() => setShowCountryCodes(true)}
          className='country-code'
        >
          +{currentCode}
        </div>
        {showCountryCodes && (
          <div className='codes-wrapper'>
            {countryCodes.map((code: string) => (
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
    </div>
  );
}
