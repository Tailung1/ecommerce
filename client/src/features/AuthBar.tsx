import { useState } from "react";

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

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowAuthBar(false);
      setIsExiting(false);
    }, 500);
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
            <p onClick={() => setActive("register")}>Register</p>
          </div>
          <hr className={`${active ==="auth"?"bg-auth":"bg-register"}`} />
        </div>
      </div>
      <div className='auth-options flex gap-2'>
        <p className='bg-orange-500'>Auth with number</p>
        <p className='bg-orange-500'>Auth with gmail</p>
      </div>
      <input
        className='px-3 max-w-[100px]'
        placeholder='Enter phone number'
      />
      <button>Submit</button>
    </div>
  );
}
