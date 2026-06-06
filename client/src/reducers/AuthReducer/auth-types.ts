export type AuthView = "login" | "register";
export type AuthOption = "email" | "phone";

export type AuthState = {
  authView: AuthView;
  activeAuthOption: AuthOption;
  isChecked: boolean;
  showCountryCodes: boolean;
  currentCode: string;
  inputValues: { email: string; password: string; phone: string };
  errors: {
    emailError: string;
    passwordError: string;
    phoneError: string;
  };
  enablePasswordReset: boolean;
};

export type AuthErrors = {
  emailError: string;
  passwordError: string;
  phoneError: string;
};

export type AuthAction =
  | { type: "SET_AUTH_VIEW"; payload: "login" | "register" }
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
  | { type: "SET_COUNTRY_CODE"; payload: string }
  | { type: "ENABLE_PASSWORD_RESET"; payload: boolean };
