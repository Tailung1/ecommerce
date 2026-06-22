import useAuthReducer from "../../../reducers/AuthReducer/AuthReducer";

const { authDispatch } = useAuthReducer();

export const authCommands = {
  setInput: (field: any, value: any) => authDispatch({ type: "SET_INPUT", field, value }),
  resetForms: () => authDispatch({ type: "RESET_FORM" }),
  toggleCountryCodes: () => authDispatch({ type: "TOGGLE_COUNTRY_CODES" }),
  selectCountryCode: (code: string) => authDispatch({ type: "SET_COUNTRY_CODE", payload: code }),
  enablePasswordReset: () => authDispatch({ type: "ENABLE_PASSWORD_RESET", payload: true }),
};
