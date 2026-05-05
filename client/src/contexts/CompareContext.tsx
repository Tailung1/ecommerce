import { useReducer, createContext, useContext, type ReactNode } from "react";

interface ProductType {
  name: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  id: number;
}

interface CompareStateTypes {
  compareCart: (null | ProductType)[];
  activeCompareCategory: string;
}

type CompareActionTypes =
  | { type: "SET_COMPARE_CART"; payload: (null | ProductType)[] }
  | { type: "SET_COMPARE_CATEGORY"; payload: string }
  | { type: "REMOVE_COMPARE_PRODUCT"; payload: number }
  | { type: "ADD_COMPARE_PRODUCT"; payload: ProductType };

const initalState = {
  compareCart: [null, null, null, null],
  activeCompareCategory: "",
};

function CompareReducer(state: CompareStateTypes, action: CompareActionTypes) {
  state.compareCart;
  switch (action.type) {
    case "SET_COMPARE_CART": {
      return { ...state, compareCart: action.payload };
    }
    case "SET_COMPARE_CATEGORY": {
      return { ...state, activeCompareCategory: action.payload };
    }
    case "ADD_COMPARE_PRODUCT": {
      const activeCompareCategory = state.compareCart.every((item) => item === null)
        ? action.payload.category
        : state.activeCompareCategory;
      const newArr = [...state.compareCart];
      const index = newArr.indexOf(null);
      newArr[index] = action.payload;
      return { ...state, compareCart: newArr, activeCompareCategory };
    }
    case "REMOVE_COMPARE_PRODUCT": {
      const filtred = state.compareCart.filter((_, index) => index !== action.payload);

      const newArr = [...filtred, ...Array(state.compareCart.length - filtred.length).fill(null)];

      return {
        ...state,
        compareCart: newArr,
        activeCompareCategory: newArr.every((i) => i === null) ? "" : state.activeCompareCategory,
      };
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

export const useCompareDispatch = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Compare Context with provider not found");
  const { compareDispatch } = context;

  const setCompareCart = (newCart: (null | ProductType)[]) => {
    return compareDispatch({ type: "SET_COMPARE_CART", payload: newCart });
  };
  const addCompareProduct = (prod: ProductType) => {
    return compareDispatch({ type: "ADD_COMPARE_PRODUCT", payload: prod });
  };
  const removeCompareProduct = (index: number) => {
    return compareDispatch({ type: "REMOVE_COMPARE_PRODUCT", payload: index });
  };
  const setCompareCategory = (category: string) => {
    return compareDispatch({ type: "SET_COMPARE_CATEGORY", payload: category });
  };

  return { setCompareCart, setCompareCategory, addCompareProduct, removeCompareProduct };
};
