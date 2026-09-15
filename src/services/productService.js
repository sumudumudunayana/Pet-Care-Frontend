import API from "./api";

const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

const searchProducts = async (params) => {
  const response = await API.get("/products/search", {
    params,
  });

  return response.data;
};

const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

const checkout = async (checkoutData) => {
  const response = await API.post("/checkout", checkoutData, {
    responseType: "blob",
  });

  return response;
};

export default {
  getProducts,
  searchProducts,
  getProductById,
  checkout,
};
