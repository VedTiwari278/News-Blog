// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// // import { useAuth } from "../../context/AuthContext";

// function LoginProtected({ children }) {
//   const { user, isLoading } = useAuth();

//   if (isLoading) return null;

//   if (user) {
//     if (user?.role === "seo") return <Navigate to="/seo-dashboard" replace />;
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// }

// export default LoginProtected;
