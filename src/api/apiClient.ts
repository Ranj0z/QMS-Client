// src/api/apiClient.ts
import axios, { AxiosError } from "axios";
const Express_URL = import.meta.env.VITE_EXPRESS_URL;

const apiClient = axios.create({
  baseURL: Express_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor (optional logging)
apiClient.interceptors.request.use((config) => {
  console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// ✅ Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // wrap the original payload in your envelope, but still return an AxiosResponse
    return {
      ...response,
      data: { success: true, data: response.data },
    };
  },
  (error: AxiosError) => {
    let message = "Network error";
    if (error.response) {
      const status = error.response.status;
      const statusText = error.response.statusText;
      message = `${status}: ${statusText}`;
    } else if (error.request) {
      message = "No response from server";
    } else if (error.message) {
      message = error.message;
    }
    // keep rejection semantics (downstream catch will receive this object)
    return Promise.reject({ success: false, message });
  }
);

export default apiClient;
