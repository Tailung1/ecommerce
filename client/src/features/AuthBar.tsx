export default function AuthBar({
  isExiting,
  setIsExiting,
  setShowAuthBar,
}: {
  isExiting: boolean;
  setIsExiting: (value: boolean) => void;

  setShowAuthBar: (value: boolean) => void;
}) {
  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowAuthBar(false);
      setIsExiting(false);
    }, 500);
  };
  return (
    <div>
      <div className={`authBar ${isExiting && "exit"}`}>
        <p onClick={handleExit} className='exit-btn'>
          X
        </p>
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
    </div>
  );
}
