import { createContext, useContext, useReducer, type ReactNode } from "react";

const initialState = {
  showAuthBar: false,
  showCompareBar: false,
  showFilterBar: false,
  isExiting: false,
};

interface BarStateTypes {
  showAuthBar: boolean;
  showCompareBar: boolean;
  showFilterBar: boolean;
  isExiting: boolean;
}

interface BarActionTypes {
  type: "SET";
  key: keyof BarStateTypes;
  value: boolean;
}

// ✅ Ensure reducer **always returns a state**
function reducer(state: BarStateTypes, action: BarActionTypes): BarStateTypes {
  const { key, value } = action;
  switch (action.type) {
    case "SET":
      return { ...state, [key]: value };
    default:
      return state; // Important: always return current state for unknown actions
  }
}

// ✅ Default value matches the structure consumers expect
const barContext = createContext<{
  state: BarStateTypes;
  dispatch: React.Dispatch<BarActionTypes>;
}>({
  state: initialState,
  dispatch: () => {}, // placeholder function
});

export const BarProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <barContext.Provider value={{ state, dispatch }}>{children}</barContext.Provider>;
};

// ✅ Hook to read state
export const useBarContext = () => {
  const context = useContext(barContext);
  if (!context) throw new Error("Bar context provider not found");
  return context.state; // return full state object
};

// ✅ Hook to dispatch actions
export const useUpdateBarContext = () => {
  const context = useContext(barContext);
  if (!context) throw new Error("Bar context provider not found");
  return context.dispatch; // return dispatch directly
};
