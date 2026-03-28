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
  showSearchBar: boolean;
  setShowSearchBar: React.Dispatch<SetStateAction<boolean>>;
  showSideBar: boolean;
  popularSearches: productType[];
  setPopularSearches: React.Dispatch<SetStateAction<productType[]>>;
  setShowSideBar: React.Dispatch<SetStateAction<boolean>>;
  language: string;
  setLanguage: React.Dispatch<SetStateAction<string>>;
  cart: productType[];
  setCart: React.Dispatch<SetStateAction<productType[]>>;
  showAuthBar: boolean;
  setShowAuthBar: React.Dispatch<SetStateAction<boolean>>;
  showCompare: boolean;
  setShowCompare: React.Dispatch<SetStateAction<boolean>>;
  selectedProductsToCompare: (null | ProductType)[];
  setSelectedProductsToCompare: React.Dispatch<
    SetStateAction<(null | ProductType)[]>
  >;
  showCompareBar: boolean;
  setShowCompareBar: React.Dispatch<SetStateAction<boolean>>;
  isExitingBar: boolean;
  setIsExitingBar: React.Dispatch<SetStateAction<boolean>>;
  showWarningBar: boolean;
  setShowWarningBar: React.Dispatch<SetStateAction<boolean>>;
  isChosen: boolean;
  setIsChosen: React.Dispatch<SetStateAction<boolean>>;
  isFull: boolean;
  setIsFull: React.Dispatch<SetStateAction<boolean>>;
  activeCompareCategory: string;
  setActiveCompareCategory: React.Dispatch<SetStateAction<string>>;
}

const MyContext = createContext({} as types);

export default function ContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showWarningBar, setShowWarningBar] =
    useState<boolean>(false);
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [activeCompareCategory, setActiveCompareCategory] =
    useState<string>("");

  const [showAuthBar, setShowAuthBar] = useState<boolean>(false);
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [selectedProductsToCompare, setSelectedProductsToCompare] =
    useState<(ProductType | null)[]>([null, null, null, null]);
  const [showCompareBar, setShowCompareBar] =
    useState<boolean>(false);
  const [isExitingBar, setIsExitingBar] = useState<boolean>(false);

  const [activeCategory, setActiveCategory] =
    useState<string>("mobile-phones");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [popularSearches, setPopularSearches] = useState<
    productType[]
  >([]);
  const [language, setLanguage] = useState<string>("EN");
  const [cart, setCart] = useState<productType[] | []>([]);

  return (
    <MyContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        showSearchBar,
        setShowSearchBar,
        showSideBar,
        setShowSideBar,
        popularSearches,
        setPopularSearches,
        language,
        setLanguage,
        cart,
        setCart,
        showAuthBar,
        setShowAuthBar,
        isExitingBar,
        setIsExitingBar,
        selectedProductsToCompare,
        setSelectedProductsToCompare,
        showCompareBar,
        setShowCompareBar,
        showCompare,
        setShowCompare,
        showWarningBar,
        setShowWarningBar,
        isChosen,
        setIsChosen,
        isFull,
        setIsFull,
        activeCompareCategory,
        setActiveCompareCategory,
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
