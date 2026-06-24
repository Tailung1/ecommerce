import type { AuthState, AuthView, AuthCommands, AuthInputValues } from "./auth.types";

export const handleValuesChange = (
  field: "email" | "password" | "phone",
  value: string,
  authCommands: AuthCommands
) => {
  if (field === "phone" && value !== "" && !/^[0-9]+$/.test(value)) return;
  authCommands.setInputField(field, value);
};

export const validateInputs = (
  authState: AuthState,
  authOption: "email" | "phone",
  value: { email: string; password: string; phone: string }
) => {
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
  return errors;
};

export const getRequestData = (authState: AuthState) => {
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
};

export const startAuthRequest = async (
  authMode: AuthView,
  actionData: Partial<AuthInputValues>
) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${authMode}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(actionData),
      credentials: "include",
    });

    const result = await response.json();

    console.log(result.message);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  }
};
