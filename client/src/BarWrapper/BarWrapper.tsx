import "./BarWrapper.scss";
import AuthBar from "../features/AuthBar/AuthBar";
import CompareBar from "../features/Compare/CompareBar";
import AlertBar from "../features/AlertBar/AlertBar";
import FilterBar from "../features/FilterBar/FilterBar";
import { useBarStateValue } from "../contexts/BarContext";
import ReactDom from "react-dom";
import { useBarDispatch } from "../contexts/BarContext";

export default function BarWrapper({
  isVisible,
  layerTarget,
  mainHeight,
}: {
  isVisible: any;
  layerTarget: string;
  mainHeight: { height: number; offsetTop: number };
}) {
  const showAuthBar = useBarStateValue("showAuthBar");
  const showFilterBar = useBarStateValue("showFilterBar");
  const showCompareBar = useBarStateValue("showCompareBar");
  const showAlert = useBarStateValue("alert").showAlert;
  const isExitingBar = useBarStateValue("isExitingBar");
  const { setBar } = useBarDispatch();
  return ReactDom.createPortal(
    <>
      {isVisible && (
        <div
          className={`auth-overlay  ${isExitingBar ? "Exit-overlay" : "Enter-overlay"}`}
          style={
            layerTarget === "main"
              ? { height: `${mainHeight.height}px`, top: `${mainHeight.offsetTop}px`, zIndex: 7 }
              : undefined
          }
          onClick={() => setBar("isExitingBar", true)}
        />
      )}
      <div>
        {showAuthBar && <AuthBar />} {showCompareBar && <CompareBar />}
        {showAlert && <AlertBar />}
        {showFilterBar && <FilterBar />}
      </div>
    </>,
    document && document.body
  );
}
