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
  showCompare: boolean;
  setShowCompare: React.Dispatch<SetStateAction<boolean>>;
  compareCart: (null | any)[];
  setCompareCart: React.Dispatch<SetStateAction<(null | any)[]>>;
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
  enablePC: boolean;
  setEnablePC: React.Dispatch<SetStateAction<boolean>>;
}

const MyContext = createContext({} as types);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [enablePC, setEnablePC] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isChosen, setIsChosen] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);
  const [activeProductCategory, setActiveProductCategory] = useState<string>("");
  const [showLanguages, setShowLanguages] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>("EN");
  const [showCompare, setShowCompare] = useState<boolean>(false);
  const [compareCart, setCompareCart] = useState<(productType | null)[]>([null, null, null, null]);

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
        compareCart,
        setCompareCart,
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
        setCurrentLanguage,
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
