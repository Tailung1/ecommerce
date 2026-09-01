import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export type Language = "en" | "ka";

interface LanguageState {
  activeLanguage: Language;
  isLanguagesVisible: boolean;
}

interface LanguageDispatch {
  setActiveLanguage: Dispatch<SetStateAction<Language>>;
  setIsLanguagesVisible: Dispatch<SetStateAction<boolean>>;
}

const LanguageStateContext = createContext<LanguageState | undefined>(undefined);

const LanguageDispatchContext = createContext<LanguageDispatch | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [activeLanguage, setActiveLanguage] = useState<Language>("ka");

  const [isLanguagesVisible, setIsLanguagesVisible] = useState(false);

  const stateValue = useMemo(
    () => ({
      activeLanguage,
      isLanguagesVisible,
    }),
    [activeLanguage, isLanguagesVisible]
  );

  const dispatchValue = useMemo(
    () => ({
      setActiveLanguage,
      setIsLanguagesVisible,
    }),
    []
  );

  return (
    <LanguageStateContext.Provider value={stateValue}>
      <LanguageDispatchContext.Provider value={dispatchValue}>
        {children}
      </LanguageDispatchContext.Provider>
    </LanguageStateContext.Provider>
  );
}

export function useLanguageStateValue(): LanguageState {
  const context = useContext(LanguageStateContext);

  if (!context) {
    throw new Error("useLanguageStateValue must be used within a LanguageProvider");
  }

  return context;
}

export function useLanguageDispatch(): LanguageDispatch {
  const context = useContext(LanguageDispatchContext);

  if (!context) {
    throw new Error("useLanguageDispatch must be used within a LanguageProvider");
  }

  return context;
}
