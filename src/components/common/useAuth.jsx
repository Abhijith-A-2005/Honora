import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../../services/api"; // Updated api.js

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("evichain_token");
    const storedUser = localStorage.getItem("evichain_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Register new user
   * @param {string} name - Full name
   * @param {string} email - Email address
   * @param {string} password - Password
   * @param {string} role - User role
   * @param {string} walletAddress - Wallet address
   */
  const signup = async (name, email, password, role, walletAddress) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.signup(name, email, password, role, walletAddress);

      // Response from backend: { success: true, token: "...", user: {...} }
      const loginData = response.data || response;
        if (loginData.token && loginData.user) {
            setToken(loginData.token);
            setUser(loginData.user);

        // Store in localStorage
        localStorage.setItem("evichain_token", loginData.token);
        localStorage.setItem("evichain_user", JSON.stringify(loginData.user));

        return { success: true, user: loginData.user };
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      const errorMsg = err.message || "Signup failed";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * @param {string} email - Email address
   * @param {string} password - Password
   */
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await api.login(email, password);
      const loginData = response.data || response;

      // Response from backend: { success: true, token: "...", user: {...} }
      if (loginData.token && loginData.user) {
        setToken(loginData.token);
        setUser(loginData.user);

        // Store in localStorage
        localStorage.setItem("evichain_token", loginData.token);
        localStorage.setItem("evichain_user", JSON.stringify(loginData.user));

        return { success: true, user: loginData.user };
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      const errorMsg = err.message || "Login failed";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setError(null);
      
      // Optional: notify backend about logout
      try {
        await api.logout();
      } catch (err) {
        // Logout endpoint may not exist, continue anyway
        console.warn("Logout endpoint error:", err);
      }

      // Clear local state
      setUser(null);
      setToken(null);

      // Clear localStorage
      localStorage.removeItem("evichain_token");
      localStorage.removeItem("evichain_user");

      return { success: true };
    } catch (err) {
      const errorMsg = err.message || "Logout failed";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  /**
   * Get current authenticated user
   */
  const getCurrentUser = async () => {
    try {
      if (!token) return null;
      
      const response = await api.getCurrentUser();
      if (response.user) {
        setUser(response.user);
        localStorage.setItem("evichain_user", JSON.stringify(response.user));
        return response.user;
      }
      return null;
    } catch (err) {
      console.error("Error fetching current user:", err);
      return null;
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  /**
   * Check if user has a specific role
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        signup,
        logout,
        getCurrentUser,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
