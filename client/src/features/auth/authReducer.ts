import { useReducer } from "react";
import type { AuthState, AuthAction } from "./authTypes";

const initialState: AuthState = {
  authView: "login",
  activeAuthOption: "phone",
  isChecked: false,
  showCountryCodes: false,
  currentCode: "995",
  inputValues: { email: "", password: "", phone: "" },
  errors: { emailError: "", passwordError: "", phoneError: "" },
};

const useAuthReducer = () => {
  function reducer(state: AuthState, action: AuthAction) {
    switch (action.type) {
      case "SET_AUTH_VIEW":
        return { ...state, authView: action.payload };
      case "SET_AUTH_OPTION":
        return { ...state, activeAuthOption: action.payload };
      case "SET_CHECKED":
        return { ...state, isChecked: action.payload };
      case "SET_INPUT":
        return {
          ...state,
          inputValues: {
            ...state.inputValues,
            [action.field]: action.value,
          },
          errors: { ...state.errors, [`${action.field}Error`]: "" },
        };
      case "SET_ERRORS":
        return {
          ...state,
          errors: { ...state.errors, ...action.payload },
        };
      case "RESET_FORM":
        return {
          ...state,
          inputValues: { email: "", password: "", phone: "" },
          errors: {
            emailError: "",
            passwordError: "",
            phoneError: "",
          },
          showCountryCodes: false,
        };
      case "TOGGLE_COUNTRY_CODES":
        return {
          ...state,
          showCountryCodes: !state.showCountryCodes,
        };
      case "SET_COUNTRY_CODE":
        return {
          ...state,
          currentCode: action.payload,
          showCountryCodes: false,
        };

      default:
        return state;
    }
  }

  const [authState, authDispatch] = useReducer(reducer, initialState);

  return { authState, authDispatch };
};

export default useAuthReducer;
