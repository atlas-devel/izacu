import React, { useState } from "react";
import api from "../../lib/axios";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const verifyAdmin = async () => {
    try {
      const res = await api.get("/auth/check-auth");
      setAuth(true);
      console.log(res.data);
    } catch (error) {
      setAuth(false);
      console.error("Error verifying admin:", error);
    }
  };
  useEffect(() => {
    verifyAdmin();
  }, []);

  if (auth === false) {
    verifyAdmin();
    return <div>Verifying Admin...</div>;
  }
  if (auth === true) {
    return children;
  }
  return children;
};

export default ProtectedRoute;
