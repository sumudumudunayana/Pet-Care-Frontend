import API from "./api";

const getProfile = async () => {
  const response = await API.get("/users/profile");
  return response.data;
};

export default {
  getProfile,
};
