import { createContext, useEffect, useState } from "react";
import { fetchSession, logoutUser } from "../services/apiAuth";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    await logoutUser(); // Optional: clears backend cookie
    setUser(null); // Clears local React state
  };

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const sessionData = await fetchSession();

        if (!isMounted) return;

        setUser(sessionData);
      } catch {
        if (!isMounted) return;

        setUser(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
