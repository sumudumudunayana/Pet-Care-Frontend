import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("pawcareUser");

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Invalid stored user", error);
        localStorage.removeItem("pawcareUser");
      }
    }

    return null;
  });

  const login = (userData) => {
    setUser(userData);

    localStorage.setItem("pawcareUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("pawcareUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
