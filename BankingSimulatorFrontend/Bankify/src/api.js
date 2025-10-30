import axios from "axios";

export const BASE_URL = "http://localhost:8080/bank_simulator/api";

const client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

const handleError = (err) => {
  if (err.response) {
    const msg = err.response.data && err.response.data.message
      ? err.response.data.message
      : err.response.statusText || `HTTP ${err.response.status}`;
    const e = new Error(msg);
    e.status = err.response.status;
    e.data = err.response.data;
    throw e;
  }
  throw err;
};

export const api = {
  get: async (path, params) => {
    try {
      const res = await client.get(path, { params });
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  post: async (path, body) => {
    try {
      const res = await client.post(path, body);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  put: async (path, body) => {
    try {
      const res = await client.put(path, body);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },

  del: async (path) => {
    try {
      const res = await client.delete(path);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },
};

export default api;