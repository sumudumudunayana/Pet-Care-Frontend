import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// AUTHENTICATION TOKEN

API.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("pawcareUser");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error("Unable to read stored user:", error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// SALES API

// Get total sales and total orders
export const getSalesSummary = () => {
  return API.get("/sales/summary");
};

// Get all completed sales
export const getAllSales = () => {
  return API.get("/sales");
};

// Get sales between two dates
export const getSalesBetween = (startDate, endDate) => {
  return API.get("/sales/range", {
    params: {
      startDate,
      endDate,
    },
  });
};

export default API;
