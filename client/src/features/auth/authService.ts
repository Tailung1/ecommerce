import type { AuthState, AuthCommands } from "./authTypes";

export const authService = {
  handleValuesChange: (
    field: "email" | "password" | "phone",
    value: string,
    authCommands: AuthCommands
  ) => {
    if (field === "phone" && value !== "" && !/^[0-9]+$/.test(value)) return;
    authCommands.setInputField(field, value);
  },
  validateInputs: (authState: AuthState) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: Partial<{ emailError: string; passwordError: string; phoneError: string }> = {};

    if (authState.activeAuthOption === "email") {
      errors.emailError = !authState.inputValues.email
        ? "Can't be empty"
        : !emailRegex.test(authState.inputValues.email)
        ? "Invalid email format"
        : "";
      errors.passwordError = !authState.inputValues.password ? "Can't be empty" : "";
    }
    if (authState.activeAuthOption === "phone") {
      errors.phoneError = !authState.inputValues.phone ? "Can't be empty" : "";
    }
    return errors;
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
