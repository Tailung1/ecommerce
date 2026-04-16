import { createContext, useContext, useReducer, type ReactNode } from "react";

const initialState = {
  showAuthBar: false,
  showCompareBar: false,
  showFilterBar: false,
};

interface stateTypes {
  showAuthBar: boolean;
  showCompareBar: boolean;
  showFilterBar: boolean;
}
type actionTypes =
  | { type: "TOGGLE"; key: keyof stateTypes }
  | { type: "SET"; key: keyof stateTypes; value: boolean };

function reducer(state: stateTypes, action: actionTypes) {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, [action.key]: ![action.key] };
    case "SET":
      return { ...state, [action.key]: action.value };
  }
}
const Context = createContext<{ statee: stateTypes; dispatchh: React.Dispatch<actionTypes> }>({
  statee: initialState,
  dispatchh: () => null,
});
export const BarProvider = ({ children }: { children: ReactNode }) => {
  const [statee, dispatchh] = useReducer(reducer, initialState);

  return <Context.Provider value={{ statee, dispatchh }}>{children}</Context.Provider>;
};
export const useBarContext = () => useContext(Context);
//         use isnot strictly neede here, but anyways..
