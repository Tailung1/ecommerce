import { useMyContext } from "../MyContext";
import serachIcon from "../assets/search-icon.png";

export default function CompareBar() {
  const { isExitingBar, setIsExitingBar, setShowCompareBar } =
    useMyContext();

  const handleExit = () => {
    setIsExitingBar(true);
    setTimeout(() => {
      setShowCompareBar(false);
      setIsExitingBar(false);
    }, 500);
  };
  return (
    <div
      className={`Bar Bar-Modifed ${isExitingBar && "ExitBar"}   `}
    >
      <p onClick={handleExit} className='exit-btn exit-btn-compare'>
        X
      </p>
      <div className='relative w-full'>
        <img
          className='absolute top-4 left-4'
          src={serachIcon}
          alt='Search Icon'
        />

        <input
          placeholder='Search'
          className='w-full border-solid bg-slate-200 p-3 pl-11'
          type='text'
        />
      </div>
    </div>
  );
}
