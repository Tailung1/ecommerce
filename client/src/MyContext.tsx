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
  popularSearches: popularSearch[];
  setPopularSearches: React.Dispatch<SetStateAction<popularSearch[]>>;

  setShowSideBar: React.Dispatch<SetStateAction<boolean>>;
}

const MyContext = createContext({} as types);

interface popularSearch {
  name: string;
}

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
    popularSearch[]
  >([]);

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
