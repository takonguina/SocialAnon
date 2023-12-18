import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState("");

    return <AuthContext.Provider value={{ authToken, setAuthToken }}>
        { children }</AuthContext.Provider>
};

export function useAuth() {
    return useContext(AuthContext);
}