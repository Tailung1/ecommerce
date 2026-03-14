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
      className={`Bar Bar-Modifed ${
        isExitingBar && "ExitBar"
      } min-h-[650px]  `}
    >
      <p onClick={handleExit} className='exit-btn exit-btn-compare'>
        X
      </p>
      <div className='relative w-full'>
        <div className='absolute flex gap-3 top-3 pl-5'>
          <img src={serachIcon} alt='Search Icon' />
          <span>Search</span>
        </div>
        <input
          className='w-full border-solid bg-green-500'
          type='text'
        />
      </div>
    </div>
  );
}
