import { useBarDispatch } from "../../../contexts/BarContext";
import { useBarStateValue } from "../../../contexts/BarContext";
import useAuthReducer from "../../../reducers/AuthReducer/AuthReducer";

export const useAuthFlow = () => {
  const isExitingBar = useBarStateValue("isExitingBar");
  return {isExitingBar}
};
