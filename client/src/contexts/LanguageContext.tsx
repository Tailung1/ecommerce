import { useReducer, createContext, useContext, type ReactNode,  } from "react";

interface languageStateTypes {
  isLanguagesVisible: boolean;
  activeLanguage: string;
}
type languageActionTypes =
  | { type: "IS_LANGUAGES_VISIBLE"; payload: boolean }
  | { type: "SET_ACTIVE_LANGUAGE"; payload: "EN" | "GE" };

const initialState = {
  isLanguagesVisible: false,
  activeLanguage: "EN",
};

function LanguageReducer(state: languageStateTypes, action: languageActionTypes) {
  switch (action.type) {
    case "IS_LANGUAGES_VISIBLE": {
      return { ...state, isLanguagesVisible: action.payload };
    }
    case "SET_ACTIVE_LANGUAGE": {
      return { ...state, activeLanguage: action.payload };
    }
  }
}

const Context = createContext<{
  languageState: languageStateTypes;
  languageDispatch: React.Dispatch<languageActionTypes>;
}>({ languageState: initialState, languageDispatch: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [languageState, languageDispatch] = useReducer(LanguageReducer, initialState);
  return (
    <Context.Provider value={{ languageState, languageDispatch }}>{children}</Context.Provider>
  );
};

export const useLanguageStateValue = () => {
  const context = useContext(Context);
  const { languageState } = context;
  return languageState;
};
export const useLanguageDispatch = () => {
  const context = useContext(Context);
  const { languageDispatch } = context;

  const setActiveLanguage = (arg: "EN" | "GE") => {
    return languageDispatch({ type: "SET_ACTIVE_LANGUAGE", payload: arg });
  };
  const setIsLanguagesVisible = (arg: boolean) => {
    return languageDispatch({ type: "IS_LANGUAGES_VISIBLE", payload: arg });
  };
  return { setActiveLanguage, setIsLanguagesVisible };
};
