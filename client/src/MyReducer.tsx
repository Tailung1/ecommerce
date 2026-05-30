import { useReducer,createContext,useContext } from "react";

const initialState: AuthStateTypes = {
  active: "auth",
  activeAuthOption: "number",
  isChecked: false,
  showCountryCodes: false,
  currentCode: "995",
  inputValues: { email: "", password: "", number: "" },
  errors: { emailError: "", passwordError: "", numberError: "" },
  enablePasswordReset: false,
};

const useAuthReducer = () => {
  function reducer(state: AuthStateTypes, action: ActionTypes) {
    switch (action.type) {
      case "SET_ACTIVE":
        return { ...state, active: action.payload };
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
          inputValues: { email: "", password: "", number: "" },
          errors: {
            emailError: "",
            passwordError: "",
            numberError: "",
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
      case "ENABLE_PASSWORD_RESET":
        return { ...state, enablePasswordReset: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

const AuthProvider=createContext(null)


export default useAuthReducer;
