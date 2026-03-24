import { Navigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;
