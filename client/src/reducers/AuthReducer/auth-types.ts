export type AuthView = "login" | "register" | "reset_password"; // why i used _ instead of -

//  "_" is safe in state strings (e.g. "reset_password").
// "-" is NOT safe for JS access (state.reset-password breaks).
// Prefer "_" for reducer/state keys.

export type AuthOption = "email" | "phone";
export type AuthInputFields = "email" | "password" | "phone";
export type AuthInputValues = { email: string; password: string; phone: string };
export type AuthInputErrors = {
  emailError: string;
  passwordError: string;
  phoneError: string;
};

export type AuthState = {
  authView: AuthView;
  activeAuthOption: AuthOption;
  isChecked: boolean;
  showCountryCodes: boolean;
  currentCode: string;
  inputValues: AuthInputValues;
  errors: AuthInputErrors;
};

export type AuthErrors = {
  emailError: string;
  passwordError: string;
  phoneError: string;
};

export type AuthAction =
  | { type: "SET_AUTH_VIEW"; payload: "login" | "register" | "reset_password" }
  | { type: "SET_AUTH_OPTION"; payload: "email" | "phone" }
  | { type: "SET_CHECKED"; payload: boolean }
  | {
      type: "SET_INPUT";
      field: "email" | "password" | "phone";
      value: string;
    }
  | {
      type: "SET_ERRORS";
      payload: Partial<AuthErrors>;
    }
  | { type: "RESET_FORM" }
  | { type: "TOGGLE_COUNTRY_CODES" }
  | { type: "SET_COUNTRY_CODE"; payload: string };
