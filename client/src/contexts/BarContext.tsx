import { createContext, useContext, useReducer } from "react";

const initialValues = {
  showAuthBar: false,
  showCompareBar: "hi",
  showFilterBar: false,
};
interface BarStateTypes {
  showAuthBar: boolean;
  showCompareBar: string;
  showFilterBar: boolean;
}
type actionTypess<K extends keyof BarStateTypes = keyof BarStateTypes> =
  | {
      type: "SET";
      key: K;
      value: BarStateTypes[K];
    }
  | {
      type: "TOGGLE";
      key: K;
      value: BarStateTypes[K];
    }

function createAction<K extends keyof BarStateTypes>(
  type: "SET" | "TOGGLE",
  key: K,
  value: BarStateTypes[K]
): actionTypess<K> {
  return { type, key, value };
}

function reducer(state: BarStateTypes, action: actionTypess) {
  switch (action.type) {
    case "SET":
      return { ...state, [action.key]: action.value };
  }
}

export const useBarReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialValues);
  dispatch(createAction("SET","showAuthBar",false));

  return { state, dispatch };
};

// const context = createContext<{ state: BarStateTypes; dispatch: () => void }>({ state, dispatch });
