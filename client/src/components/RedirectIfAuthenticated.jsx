import { Navigate } from 'react-router-dom';
import { AuthUser } from '../context/authContext';

// eslint-disable-next-line react/prop-types
const RedirectIfAuthenticated = ({ children }) => {
  const { user } = AuthUser();

  if (user.loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default RedirectIfAuthenticated;
