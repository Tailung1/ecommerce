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
  setPopularSearches: React.Dispatch<SetStateAction<any>>;
  shoppingCart: any[];
  setShoppingCart: React.Dispatch<SetStateAction<any[]>>;
}

const MyContext = createContext({} as types);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<string>("mobile-phones");
  const [popularSearches, setPopularSearches] = useState<any>([]);
  const [shoppingCart, setShoppingCart] = useState<any[] | []>([]);

  return (
    <MyContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        popularSearches,
        setPopularSearches,
        setShoppingCart,
        shoppingCart,
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
