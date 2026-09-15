import API from "./api";

const register = async (userData) => {
  const response = await API.post("/auth/register", userData);

  return response.data;
};

const login = async (email, password) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export default {
  register,
  login,
};
