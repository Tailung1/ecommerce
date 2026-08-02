import "./BarWrapper.scss";
import AuthBar from "../features/auth/ui/AuthBar";
import CompareBar from "../features/Compare/CompareBar";
import AlertBar from "../features/AlertBar/AlertBar";
import FilterBar from "../features/FilterBar/FilterBar";
import { useBarStateValue } from "../contexts/BarContext";
import ReactDom from "react-dom";
import { useBarDispatch } from "../contexts/BarContext";

export default function BarWrapper({
  layerTarget,
  mainHeight,
  isDesktop,
}: {
  layerTarget: string;
  mainHeight: { height: number; offsetTop: number };
  isDesktop: boolean;
}) {
  const showAuthBar = useBarStateValue("showAuthBar");
  const showFilterBar = useBarStateValue("showFilterBar");
  const showCompareBar = useBarStateValue("showCompareBar");
  const showAlert = useBarStateValue("alert").showAlert;
  const showSearchBar = useBarStateValue("showSearchBar");
  const isExitingBar = useBarStateValue("isExitingBar");
  const { setBar } = useBarDispatch();

  const handleOnClick = () => {
    if (!isDesktop || (isDesktop && showSearchBar)) {
      setBar("isExitingBar", true);
    }
  };

  return ReactDom.createPortal(
    <>
      <div
        className={`overlay  ${isExitingBar ? "Exit-overlay" : "Enter-overlay"}`}
        style={
          layerTarget === "main"
            ? { height: `${mainHeight.height}px`, top: `${mainHeight.offsetTop}px`, zIndex: 7 }
            : undefined
        }
        onClick={handleOnClick}
      />

      <div>
        {showAuthBar && <AuthBar />} {showCompareBar && <CompareBar />}
        {showAlert && <AlertBar />}
        {showFilterBar && <FilterBar />}
      </div>
    </>,
    document && document.body
  );
}
