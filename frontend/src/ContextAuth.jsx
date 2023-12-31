import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState("");
    useEffect(() => {
        setAuthToken(localStorage.getItem('token'));
      });
    return <AuthContext.Provider value={{ authToken, setAuthToken }}>
        { children }</AuthContext.Provider>
};

export function useAuth() {
    return useContext(AuthContext);
}