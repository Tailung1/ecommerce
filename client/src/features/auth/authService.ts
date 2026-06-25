import type { AuthState, AuthOption, AuthInputValues, AuthCommands } from "./authTypes";

export const authService = {
  handleValuesChange: (
    field: "email" | "password" | "phone",
    value: string,
    authCommands: AuthCommands
  ) => {
    if (field === "phone" && value !== "" && !/^[0-9]+$/.test(value)) return;
    authCommands.setInputField(field, value);
  },
  validateInputs: (authState: AuthState, authOption: AuthOption, value: AuthInputValues) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: Partial<{ emailError: string; passwordError: string; phoneError: string }> = {};

    if (authOption === "email") {
      errors.emailError = !value.email
        ? "Can't be empty"
        : !emailRegex.test(authState.inputValues.email)
        ? "Invalid email format"
        : "";
      errors.passwordError = !value.password ? "Can't be empty" : "";
    }
    if (authOption === "phone") {
      errors.phoneError = !value.phone ? "Can't be empty" : "";
    }
    return errors
  },
  getRequestData: (authState: AuthState) => {
    let actionData = {};
    if (authState.activeAuthOption === "email") {
      actionData = {
        email: authState.inputValues.email,
        password: authState.inputValues.password,
      };
    } else {
      actionData = { phone: authState.inputValues.phone };
    }
    return actionData;
  },
};
