import { type ReactNode } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


export const AdminRoute = ({ children }: { children: ReactNode }) => {
const { user } = useAuth();
if (!user) return <Navigate to="/login" replace />;
return user.role === "admin" ? children : <Navigate to="/" replace />;
};