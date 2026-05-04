import { useReducer, createContext, useContext, type ReactNode } from "react";

interface ProductType {
  name: string;
  price: number;
  stock: number;
  id:number
}

interface CompareStateTypes {
  compareCart: (null | ProductType)[];
  activeCompareCategory: string;
}

type CompareActionTypes =
  | { type: "SET_COMPARE_CART"; payload: (null | ProductType)[] }
  | { type: "SET_ACTIVE_COMPARE_CATEGORY"; payload: string };

const initalState = {
  compareCart: [null, null, null, null],
  activeCompareCategory: "",
};

function CompareReducer(state: CompareStateTypes, action: CompareActionTypes) {
  switch (action.type) {
    case "SET_COMPARE_CART": {
      return { ...state, compareCart: action.payload };
    }
    case "SET_ACTIVE_COMPARE_CATEGORY": {
      return { ...state, activeProductsCompareCategory: action.payload };
    }
    default:
      return state;
  }
}

const Context = createContext<{
  compareState: CompareStateTypes;
  compareDispatch: React.Dispatch<CompareActionTypes>;
}>({ compareState: initalState, compareDispatch: () => null });

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareState, compareDispatch] = useReducer(CompareReducer, initalState);
  return <Context.Provider value={{ compareState, compareDispatch }}>{children}</Context.Provider>;
}

export const useCompareCart = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Compare Context with provider not found");
  const { compareState } = context;
  return compareState;
};
// export const compareDispatch = () => {
//   const context = useContext(Context);
//   if (!context) throw new Error("Compare Context with provider not found");
//   const { compareDispatch } = context;

//   const setCompareCart = (newCart: (null | ProductType)[]) => { 
//     compareDispatch({ type: "SET_COMPARE_CART", payload: newCart });
//   };
//   return setCompareCart;
// };
export const useCompareDispatch = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Compare Context with provider not found");
  const { compareDispatch } = context;
  return compareDispatch;
};
