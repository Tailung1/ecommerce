import React, {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";

interface types {
  activeSection: string;
  setActiveSection: React.Dispatch<SetStateAction<string>>;
  showSearchBar: boolean;
  setShowSearchBar: React.Dispatch<SetStateAction<boolean>>;
  showSideBar: boolean;
  popularSearches: productType[];
  setPopularSearches: React.Dispatch<SetStateAction<productType[]>>;
  setShowSideBar: React.Dispatch<SetStateAction<boolean>>;
  language: string;
  setLanguage: React.Dispatch<SetStateAction<string>>;
}

const MyContext = createContext({} as types);

export default function ContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeSection, setActiveSection] =
    useState<string>("mobile-phones");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [popularSearches, setPopularSearches] = useState<
    productType[]
  >([]);
  const [language, setLanguage] = useState<string>("EN");

  return (
    <MyContext.Provider
      value={{
        activeSection,
        setActiveSection,
        showSearchBar,
        setShowSearchBar,
        showSideBar,
        setShowSideBar,
        popularSearches,
        setPopularSearches,
        language,
        setLanguage,
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
