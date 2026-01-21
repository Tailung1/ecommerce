import {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";

interface types {
  sectionToDisplay: string;
  setSectionToDisplay: React.Dispatch<SetStateAction<string>>;
}

const MyContext = createContext({} as types);

export default function ContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sectionToDisplay, setSectionToDisplay] =
    useState<string>("mobile-phones");
  return (
    <MyContext.Provider
      value={{
        sectionToDisplay,
        setSectionToDisplay,
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
