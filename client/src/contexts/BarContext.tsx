import React, { createContext, useContext, useReducer, type ReactNode } from "react";

const initialState = {
  showAuthBar: false,
  showCompareBar: false,
  showFilterBar: false,
  isExitingBar: false,
  showAlert: false,
  showSearchBar: false,
  showSideBar: false,
};
interface barStateTypes {
  showAuthBar: boolean;
  showCompareBar: boolean;
  showFilterBar: boolean;
  isExitingBar: boolean;
  showAlert: boolean;
  showSearchBar: boolean;
  showSideBar: boolean;
}
interface barActionTypes {
  type: "SET";
  key: keyof barStateTypes;
  value: boolean;
}

function reducer(state: barStateTypes, action: barActionTypes) {
  const { key, value } = action;
  switch (action.type) {
    case "SET": {
      return { ...state, [key]: value };
    }
    default:
      return state;
  }
}

const BarContext = createContext<{
  BarState: barStateTypes;
  BarDispatch: React.Dispatch<barActionTypes>;
}>({ BarState: initialState, BarDispatch: () => {} });

export const BarProvider = ({ children }: { children: ReactNode }) => {
  const [BarState, BarDispatch] = useReducer(reducer, initialState);
  return <BarContext.Provider value={{ BarState, BarDispatch }}>{children}</BarContext.Provider>;
};

export const BarContextCotent = () => {
  const context = useContext(BarContext);
  if (!context) throw new Error("Bar context provider not found");
  return context;
};

export const UseBarContext = () => {
  const context = useContext(BarContext);
  if (!context) throw new Error("Bar context provider not found");
  const { BarState } = context;
  return BarState;
};
export const useBarUpdater = (key: keyof barStateTypes, value: boolean) => {
  const context = useContext(BarContext);
  if (!context) throw new Error("Bar context provider not found");
  const { BarDispatch } = context;
  return () => BarDispatch({ type: "SET", key, value });
};
