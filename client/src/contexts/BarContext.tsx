import React, {
  useMemo,
  useCallback,
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

const initialState = {
  showAuthBar: false,
  showCompareBar: false,
  showFilterBar: false,
  isExitingBar: false,
  alert: {
    showAlert: false,
    isFull: false,
    isChosen: false,
  },
  showSearchBar: false,
  showSideBar: false,
};

interface BarStateTypes {
  showAuthBar: boolean;
  showCompareBar: boolean;
  showFilterBar: boolean;
  isExitingBar: boolean;
  alert: {
    showAlert: boolean;
    isFull: boolean;
    isChosen: boolean;
  };
  showSearchBar: boolean;
  showSideBar: boolean;
}

type BarActions =
  | { type: "SET_BAR"; key: keyof Omit<BarStateTypes, "alert">; value: boolean }
  | { type: "SET_ALERT"; key: keyof BarStateTypes["alert"]; value: boolean };

function reducer(state: BarStateTypes, action: BarActions) {
  const { key, value } = action;
  switch (action.type) {
    case "SET_BAR": {
      return { ...state, [key]: value };
    }
    case "SET_ALERT": {
      return { ...state, Alert: { ...state.alert, [action.key]: action.value } };
    }
    default:
      return state;
  }
}

const Context = createContext<{
  barState: BarStateTypes;
  barDispatch: React.Dispatch<BarActions>;
}>({ barState: initialState, barDispatch: () => {} });

export const BarProvider = ({ children }: { children: ReactNode }) => {
  const [barState, barDispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{ barState, barDispatch }}>{children}</Context.Provider>;
};

export const useBarContext = () => {
  const context = useContext(Context);
  return context;
};
export const useBarDispatch = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Bar Context with provider not found");
  const { barDispatch } = context;
  const barDispatcher = useCallback(
    (key: keyof Omit<BarStateTypes, "alert">, value: boolean) =>
      barDispatch({ type: "SET_BAR", key, value }),
    [barDispatch]
  );
  const barAlertDispatcher = useCallback(
    (key: keyof BarStateTypes["alert"], value: boolean) =>
      barDispatch({ type: "SET_ALERT", key, value }),
    [barDispatch]
  );

  return useMemo(
    () => ({
      barDispatcher,
      barAlertDispatcher,
    }),
    [barDispatcher, barAlertDispatcher]
  );
};

export function useBarStateValue<K extends keyof BarStateTypes>(key: K): BarStateTypes[K] {
  const { barState } = useContext(Context);
  return barState[key];
}
