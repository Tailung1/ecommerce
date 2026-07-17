type requestOptions = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: HeadersInit;
};

export const apiClient = async (url: string, options: requestOptions) => {
  const res = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      "Content-type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : "undefined",
  });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data;
};
