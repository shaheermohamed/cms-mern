import { Navigate } from "react-router-dom";
import { AuthUser } from "../context/authContext";
import NavBar from "./NavBar";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user } = AuthUser();

  if (!user.loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default ProtectedRoute;
