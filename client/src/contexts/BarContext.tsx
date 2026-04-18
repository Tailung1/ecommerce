import React, { createContext, useContext, useReducer, type ReactNode } from "react";

const initialState = {
  showAuthBar: false,
  showCompareBar: false,
  showFilterBar: false,
  isExiting: false,
};
interface barStateTypes {
  showAuthBar: boolean;
  showCompareBar: boolean;
  showFilterBar: boolean;
  isExiting: boolean;
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
  }
}

const barContext = createContext<{
  state: barStateTypes;
  dispatch: React.Dispatch<barActionTypes>;
}>({ state: initialState, dispatch: () => null });

export const BarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <barContext.Provider value={{ state, dispatch }}>{children}</barContext.Provider>;
};

export const useBarContext = () => {
  const context = useContext(barContext);
  if (!context) throw new Error("Bar context provider not found");
  const { state } = context;
  return state;
};
export const useUpdateBarContext = () => {
  const context = useContext(barContext);
  if (!context) throw new Error("Bar context provider not found");
  const { dispatch } = context;
  return dispatch;
};
