import { useAuth } from "../../Contexts/AuthContext/AuthContext";
import { Navigate } from "react-router-dom";
import type { UserRole } from "../../types";
import type { ReactNode } from "react";

interface ProtectedComponentProps {
    children: ReactNode,
    role?: UserRole
}

export function ProtectedComponent({children, role} : ProtectedComponentProps) {
    const {token, user} = useAuth()

    if(!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if(role && user?.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>
}