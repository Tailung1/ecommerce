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
  popularSearches: any[];
  setPopularSearches: React.Dispatch<SetStateAction<productType[]>>;
  setShowSideBar: React.Dispatch<SetStateAction<boolean>>;
  cart: any[];
  setCart: React.Dispatch<SetStateAction<productType[]>>;
  showAuthBar: boolean;
  setShowAuthBar: React.Dispatch<SetStateAction<boolean>>;
  showCompare: boolean;
  setShowCompare: React.Dispatch<SetStateAction<boolean>>;
  compareCart: (null | any)[];
  setCompareCart: React.Dispatch<SetStateAction<(null | any)[]>>;
  showCompareBar: boolean;
  setShowCompareBar: React.Dispatch<SetStateAction<boolean>>;
  isExitingBar: boolean;
  setIsExitingBar: React.Dispatch<SetStateAction<boolean>>;
  showAlert: boolean;
  setShowAlert: React.Dispatch<SetStateAction<boolean>>;
  isChosen: boolean;
  setIsChosen: React.Dispatch<SetStateAction<boolean>>;
  isFull: boolean;
  setIsFull: React.Dispatch<SetStateAction<boolean>>;
  activeProductCategory: string;
  setActiveProductCategory: React.Dispatch<SetStateAction<string>>;
  showLanguages: boolean;
  setShowLanguages: React.Dispatch<SetStateAction<boolean>>;
  currentLanguage: string;
  setCurrentLanguage: React.Dispatch<SetStateAction<string>>;
}

const MyContext = createContext({} as types);

export default function ContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [activeProductCategory, setActiveProductCategory] =
    useState<string>("");
  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] =
    useState<string>("EN");
  const [showAuthBar, setShowAuthBar] = useState<boolean>(false);
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [compareCart, setCompareCart] = useState<
    (productType | null)[]
  >([null, null, null, null]);
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
        cart,
        setCart,
        showAuthBar,
        setShowAuthBar,
        isExitingBar,
        setIsExitingBar,
        compareCart,
        setCompareCart,
        showCompareBar,
        setShowCompareBar,
        showCompare,
        setShowCompare,
        showAlert,
        setShowAlert,
        isChosen,
        setIsChosen,
        isFull,
        setIsFull,
        activeProductCategory,
        setActiveProductCategory,
        showLanguages,
        setShowLanguages,
        currentLanguage,
        setCurrentLanguage
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
