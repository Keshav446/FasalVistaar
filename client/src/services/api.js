// Small fetch wrapper. Adds the login token (Bearer) and throws readable errors.
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Change "token" if your auth code saves it under a different localStorage key.
const getToken = () => localStorage.getItem("token");

export async function api(path, { method = "GET", body, params } = {}) {
  const qs = params ? "?" + new URLSearchParams(Object.entries(params).filter(([, v]) => v !== "" && v != null)) : "";
  const token = getToken();
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}${qs}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(res.status === 429 ? "Too many requests. Please wait a few minutes." : json.message || "Something went wrong");
    err.status = res.status;
    err.details = json.details;
    throw err;
  }
  return json;
}