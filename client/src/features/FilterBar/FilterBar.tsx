import { useMyContext } from "../../MyContext";
import "./Filter.scss";
import exitIcon from "../../assets/reject.png";
import binIcon from "../../assets/bin.png";

export default function FilterBar() {
  const {
    isExitingBar,
    setIsExitingBar,
    setShowFilterBar,
  } = useMyContext();

  const handleReset = () => {};

  const handleReject = () => {
    setIsExitingBar(true);
    setTimeout(() => {
      setShowFilterBar(false);
      setIsExitingBar(false);
    }, 600);
  };

  return (
    <div
      className={`filterBar ${isExitingBar && "reject-FilterBar"}`}
    >
      <div className='compare-header'>
        <div className='compare-navigation'>
          <div onClick={handleReject}>
            <img src={exitIcon} alt='Left arrow icon' />
            <p>Back</p>
          </div>
          <div onClick={handleReset}>
            <img src={binIcon} alt='bin icon' />
            <p>Clear</p>
          </div>
        </div>
        <hr className='compare-hr' />
      </div>
    </div>
  );
}
