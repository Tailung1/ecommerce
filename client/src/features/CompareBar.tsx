import { useMyContext } from "../MyContext";

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
    <div className={`Bar Bar-Modifed ${isExitingBar && "ExitBar"} `}>
      <p onClick={handleExit} className='exit-btn exit-btn-compare'>
        X
      </p>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
      <div>Hi</div>
    </div>
  );
}
