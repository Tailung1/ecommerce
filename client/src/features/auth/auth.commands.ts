import type { AuthView, AuthInputFields } from "../../reducers/AuthReducer/auth-types";

export const useAuthCommands = (authDispatch: any) => {
  return {
    setAuthView: (payload: AuthView) => authDispatch({ type: "SET_AUTH_VIEW", payload }),
    setInputField: (field: AuthInputFields, value: string) =>
      authDispatch({ type: "SET_INPUT", field, value }),
    resetForms: () => authDispatch({ type: "RESET_FORM" }),
    toggleCountryCodes: () => authDispatch({ type: "TOGGLE_COUNTRY_CODES" }),
    selectCountryCode: (code: string) => authDispatch({ type: "SET_COUNTRY_CODE", payload: code }),
  };
};
