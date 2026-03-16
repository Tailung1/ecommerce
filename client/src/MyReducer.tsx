import { useReducer } from "react";

const initialState: StateTypes = {
  active: "auth",
  activeAuthOption: "number",
  isChecked: false,
  showCountryCodes: false,
  currentCode: "995",
  inputValues: { email: "", password: "", number: "" },
  errors: { emailError: "", passwordError: "", numberError: "" },
};

const useAuthReducer = () => {
  function reducer(state: StateTypes, action: ActionTypes) {
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
          errors: { ...state.errors, [`${action.field}Error`]: "" }, // clear error on input
        };
      case "SET_ERRORS":
        return {
          ...state,
          errors: { ...state.errors, [action.field]: action.value },
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
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export default useAuthReducer;
