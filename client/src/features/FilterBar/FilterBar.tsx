import { useMyContext } from "../../MyContext";
import "./Filter.scss";
import exitIcon from "../../assets/reject.png";
import binIcon from "../../assets/bin.png";
import { useBarContext } from "../../contexts/BarContext";

export default function FilterBar() {
  const {} = useMyContext();
  const { BarState, BarDispatch } = useBarContext();
  const handleReset = () => {};

  const handleAnimationEnd = (e) => {
    if (BarState.isExitingBar && e.animationName === "reject-FilterBar") {
      BarDispatch({ type: "SET", key: "showFilterBar", value: false });
      BarDispatch({ type: "SET", key: "isExitingBar", value: false });
    }
  };

  return (
    <div
      onAnimationEnd={(e) => handleAnimationEnd(e)}
      className={`filterBar ${BarState.isExitingBar && "reject-FilterBar"}`}
    >
      <div className='compare-header'>
        <div className='compare-navigation'>
          <div onClick={() => BarDispatch({ type: "SET", key: "isExitingBar", value: true })}>
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
