interface productType {
  id: number;
  name: string;
  color: string;
  description: string;
  price: number;
}
type ProductType = {
  id: number;
  name: string;
  brand: string;
};

type StateTypes = {
  active: "auth" | "register";
  activeAuthOption: "email" | "number";
  isChecked: boolean;
  showCountryCodes: boolean;
  currentCode: string;
  inputValues: { email: string; password: string; number: string };
  errors: {
    emailError: string;
    passwordError: string;
    numberError: string;
  };
};

type Errors = {
  emailError: string;
  passwordError: string;
  numberError: string;
};

type ActionTypes =
  | { type: "SET_ACTIVE"; payload: "auth" | "register" }
  | { type: "SET_AUTH_OPTION"; payload: "email" | "number" }
  | { type: "SET_CHECKED"; payload: boolean }
  | {
      type: "SET_INPUT";
      field: "email" | "password" | "number";
      value: string;
    }
  | {
      type: "SET_ERRORS";
      payload: Partial<Errors>;
    }
  | { type: "RESET_FORM" }
  | { type: "TOGGLE_COUNTRY_CODES" }
  | { type: "SET_COUNTRY_CODE"; payload: string };
