/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { authorization } from "../services/api/apiCalls";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ loggedIn: false });

  const userFetching = async () => {
    if (!localStorage.getItem("token")) return;
    try {
      const response = await authorization({
        token: localStorage.getItem("token"),
      });

      console.log("fetch:", response);
      setUser(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userFetching();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthUser = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
