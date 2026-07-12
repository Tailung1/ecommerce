import type { AuthView, AuthOption, AuthInputFields, AuthErrors } from "./authTypes";

export const useAuthCommands = (authDispatch: any) => {
  return {
    setAuthView: (payload: AuthView) => authDispatch({ type: "SET_AUTH_VIEW", payload }),
    setAuthOption: (payload: AuthOption) => authDispatch({ type: "SET_AUTH_OPTION", payload }),
    setInputField: (field: AuthInputFields, value: string) =>
      authDispatch({ type: "SET_INPUT", field, value }),
    setAuthInputErrros: (payload: Partial<AuthErrors>) =>
      authDispatch({ type: "SET_ERRORS", payload }),
    resetForms: () => authDispatch({ type: "RESET_FORM" }),
    toggleCountryCodes: () => authDispatch({ type: "TOGGLE_COUNTRY_CODES" }),
    selectCountryCode: (code: string) => authDispatch({ type: "SET_COUNTRY_CODE", payload: code }),
  };
};
