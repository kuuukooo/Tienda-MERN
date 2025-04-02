import { useEffect } from "react";
import useAuthStore from "../store/auth";

const useAuth = () => {
  const { user, loading, setUser, setLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Verificamos autenticación al montar la app
  }, []);

  return { user, loading, setUser, setLoading, checkAuth };
};

export default useAuth;
