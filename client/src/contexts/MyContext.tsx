import React, {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";

interface types {
  activeCategory: string;
  setActiveCategory: React.Dispatch<SetStateAction<string>>;
  popularSearches: any[];
  setPopularSearches: React.Dispatch<SetStateAction<productType[]>>;
  shoppingCart: any[];
  setShoppingCart: React.Dispatch<SetStateAction<productType[]>>;
  enablePC: boolean;
  setEnablePC: React.Dispatch<SetStateAction<boolean>>;
}

const MyContext = createContext({} as types);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [enablePC, setEnablePC] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("mobile-phones");
  const [popularSearches, setPopularSearches] = useState<productType[]>([]);
  const [shoppingCart, setShoppingCart] = useState<productType[] | []>([]);

  return (
    <MyContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        popularSearches,
        setPopularSearches,
        setShoppingCart,
        shoppingCart,
        enablePC,
        setEnablePC,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export const useMyContext = () => {
  const context = useContext(MyContext);
  return context;
};
