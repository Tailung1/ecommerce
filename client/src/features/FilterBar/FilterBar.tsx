import { useMyContext } from "../../contexts/MyContext";
import "./Filter.scss";
import exitIcon from "../../assets/reject.png";
import binIcon from "../../assets/bin.png";
import { useBarDispatch } from "../../contexts/BarContext";
import { useBarStateValue } from "../../contexts/BarContext";
import ReactDOM from "react-dom";

export default function FilterBar() {
  const {} = useMyContext();
  const { setBar } = useBarDispatch();
  const isExitingBar = useBarStateValue("isExitingBar");
  const handleReset = () => {};

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (isExitingBar && e.animationName === "reject-FilterBar") {
      setBar("showFilterBar", false);
      setBar("isExitingBar", false);
    }
  };
  const content = (
    <div
      onAnimationEnd={(e) => handleAnimationEnd(e)}
      className={`filterBar ${isExitingBar && "reject-FilterBar"}`}
    >
      <div className='compare-header'>
        <div className='compare-navigation'>
          <div onClick={() => setBar("isExitingBar", true)}>
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

  return ReactDOM.createPortal(content, document && document.body);
}
