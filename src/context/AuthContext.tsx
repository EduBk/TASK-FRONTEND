"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define la estructura de los datos del usuario autenticado
interface User {
  id: String;
  name: String;
  lastName: String;
  email: String;
  created_at: Date;
  updated_at: Date;
  phoneNumber: String;
  address: String[];
}

// Define el contexto de autenticación con TypeScript
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
 
  useEffect(() => {
    // Lee la cookie en el lado del cliente
    const miCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("User="));

    if (miCookie) {
      const userAuth = JSON.parse(decodeURIComponent(miCookie.split("=")[1]));
      login(userAuth);
      // console.log("Contenido de la cookie:", userAuth);
    } else {
      console.log("La cookie no se encontró.");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }

  return context;
};
