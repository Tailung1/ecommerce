import React, { createContext, useContext, useReducer, type ReactNode } from "react";

const initialState = {
  showAuthBar: false,
  showCompareBar: false,
  showFilterBar: false,
  isExitingBar: false,
  Alert: {
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
  Alert: {
    showAlert: boolean;
    isFull: boolean;
    isChosen: boolean;
  };
  showSearchBar: boolean;
  showSideBar: boolean;
}


type BarActions =
  | { type: "SET_BAR"; key: keyof Omit<BarStateTypes, "Alert">; value: boolean }
  | { type: "SET_ALERT"; key: keyof BarStateTypes["Alert"]; value: boolean };

function reducer(state: BarStateTypes, action: BarActions) {
  const { key, value } = action;
  switch (action.type) {
    case "SET_BAR": {
      return { ...state, [key]: value };
    }
    case "SET_ALERT": {
      return { ...state, Alert: { ...state.Alert, [action.key]: action.value } };
    }
    default:
      return state;
  }
}

const Context = createContext<{
  BarState: BarStateTypes;
  BarDispatch: React.Dispatch<BarActions>;
}>({ BarState: initialState, BarDispatch: () => {} });

export const BarProvider = ({ children }: { children: ReactNode }) => {
  const [BarState, BarDispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{ BarState, BarDispatch }}>{children}</Context.Provider>;
};

export const useBarContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Bar context provider not found");
  return context;
};

export const useBarState = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Bar context provider not found");
  const { BarState } = context;
  return BarState;
};

export const useBarUpdater = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Bar context provider not found");
  const { BarDispatch } = context;
  return (key: keyof Omit<BarStateTypes, "Alert">, value: boolean) =>
    BarDispatch({ type: "SET_BAR", key, value });
};
export const useBarAlertUpdater = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Bar context provider not found");
  const { BarDispatch } = context;
  return (key: keyof Pick<BarStateTypes, "Alert">, value: boolean) =>
    BarDispatch({ type: "SET_ALERT", key, value });
};
