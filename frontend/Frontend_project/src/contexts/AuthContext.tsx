import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  name: string;
}

interface JwtPayload {
  exp: number;
  user_id?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // 🔐 JWT validity check
  const isTokenValid = useCallback((): boolean => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);

      return decoded.exp > now;
    } catch {
      return false;
    }
  }, []);

  // 🔁 Restore auth state on reload
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser || !isTokenValid()) {
      logout();
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [isTokenValid]);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      /*
        🔥 Replace with real API call
        const res = await api.login(email, password);
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      */

      // Mock token (expires in 1 minute)
     

      const mockUser: User = {
        id: "1",
        email,
        name: "Demo",
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      return true;
    },
    []
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      // same as login for now
      return login(email, password);
    },
    [login]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && isTokenValid(),
        login,
        register,
        logout,
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
