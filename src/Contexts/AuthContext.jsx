import { createContext, useEffect, useState } from "react";
import { fetchSession, logoutUser } from "../services/apiAuth";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      // CRUCIAL: Always clear the token from localStorage on logout
      localStorage.removeItem("survey_session");
      setUser(null);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // 1. Check if the URL contains a ?session=TOKEN string
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("session");

    if (tokenFromUrl) {
      // 2. Lock it into localStorage
      localStorage.setItem("survey_session", tokenFromUrl);

      // 3. Clean up the URL bar beautifully so the user doesn't see the long token string
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    async function checkAuth() {
      try {
        // 4. Fire the session fetch
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
