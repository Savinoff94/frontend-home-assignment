import { createContext, useContext, useEffect, useState } from "react";
import { type User } from "../../types";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "./api/auth";
interface AuthContextValue {
    user: User | null;
    token: string | null;
    error: string | null;
    isLoading: boolean
    login: (username: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const navigate = useNavigate()


    useEffect(() => {
        const savedToken = localStorage.getItem("authToken");
        const savedUser = localStorage.getItem("authUser");
        if (savedToken && savedUser) {
            try {
                const user = JSON.parse(savedUser) as User
                setToken(savedToken);
                setUser(user);
                if (user.role === 'admin') {
                    navigate('/users', { replace: true });
                }
            } catch {
                localStorage.removeItem("authToken");
                localStorage.removeItem("authUser");
            }
        }
        setInitialized(true);
    }, []);

    const login = async (username: string, password: string) => {
        setIsLoading(true)
        setError(null)
        try {
            const data = await loginRequest(username, password)
      
            if (data.role !== 'admin') {
              setError('Only admin users are allowed.');
              setIsLoading(false);
              return;
            }

            const newUser = {
                uuid: data.uuid,
                username: data.username,
                role: data.role,
            }

            setToken(data.token);
            setUser(newUser);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('authUser', JSON.stringify(newUser));
        
            if (newUser.role === 'admin') {
                navigate('/users', { replace: true });
            } else {
                navigate('/login', { replace: true });
            }
                      
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        navigate('/login', { replace: true });
    };

    const value = {user, login, logout, token, isLoading, error}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}