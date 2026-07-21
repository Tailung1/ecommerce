type requestOptions = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

export const apiClient = async (url: string, options: requestOptions = { method: "GET" }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetch(`${API_URL}${url}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    // undefined tells fetch that no body was provided
  });

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! REMINDER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // fetch does not throw errors for HTTP failures (404, 401, 500).
  // It still returns a Response object, so code reaches res.json() even when request fails.
  // catch(() => null) prevents crashes if response body is empty or not valid JSON.
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
};
