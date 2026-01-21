import {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  useContext,
} from "react";

interface types {
  name: string;
  setName: React.Dispatch<SetStateAction<string>>;
}

const MyContext = createContext({} as types);

export default function ContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [name, setName] = useState<string>("hello");
  return (
    <MyContext.Provider
      value={{
        name,
        setName,
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
