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
  resolution: { isIpad: boolean; isPc: boolean };
  setResoltion: React.Dispatch<
    SetStateAction<{
      isIpad: boolean;
      isPc: boolean;
    }>
  >;
}

const MyContext = createContext({} as types);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const width = typeof window.innerWidth === "undefined" ? 0 : window.innerWidth;
  const [resolution, setResoltion] = useState<{
    isIpad: boolean;
    isPc: boolean;
  }>({ isIpad: width >= 768 && width < 1023, isPc: width > 1023 });
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
        resolution,
        setResoltion,
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
