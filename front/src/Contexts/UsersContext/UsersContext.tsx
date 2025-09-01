import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, type UserRole } from '../../types';
import { useAuth } from '../AuthContext/AuthContext';
import { deletehUsersRequest, fetchUsersRequest, createUserRequest } from './api/users';

type UsersContextValue = {
    users: User[];
    isLoading: boolean;
    error: string | null;
    notification: string | null;
    setNotification: (notification: string | null) => void
    deleteUser: () => Promise<void>;
    setUserToDelete: (user: User | null) => void;
    userToDelete: User | null;
    createUser: (username: string, password: string, role: UserRole, successCallback: () => void) => Promise<void>
};

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

export function UsersProvider({ children }: { children: React.ReactNode }) {
    const { token, user } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                setUsers([]);
                setError(null);
                setIsLoading(false);
                return;
            }
    
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetchUsersRequest(token)
                if (!res.ok) throw new Error('Failed to fetch users. You may not have permission.');
                const data = (await res.json()) as User[];
                setUsers(data);
            } catch (e) {
                setError((e as Error).message);
                setUsers([]);
            } finally {
                setIsLoading(false);
            }
        };

        if(token && user) {
            fetchUsers();
        }
    }, [token]);

    const deleteUser = async () => {
        try {
            if (!token) throw new Error('Not authenticated');
            if (!userToDelete) return;

            const res = await deletehUsersRequest(userToDelete.uuid, token);

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || 'Failed to delete user.');
            }

            setUsers(prev => prev.filter(u => u.uuid !== userToDelete.uuid));
        
        } catch (error) {
            setNotification((error as Error).message)    
        } finally {
            setIsLoading(false)
            setUserToDelete(null)
        }
    }

    const createUser = async (username: string, password: string, role: UserRole, successCallback: () => void) => {
        
        if (!token) return
        
        setIsLoading(true);
        setError(null);

        try {
            const response = await createUserRequest({ username, password, role }, token) 
                
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create user.');
            }
            const newUser = data as User;
            successCallback();
            setUsers((prev) => [...prev, {username: newUser.username, role: newUser.role, uuid: newUser.uuid}])
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }

    const value = { 
        users,
        setUserToDelete,
        isLoading,
        error,
        notification,
        deleteUser,
        setNotification,
        userToDelete,
        createUser
    }

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
    const ctx = useContext(UsersContext);
    if (!ctx) throw new Error('useUsers must be used within a UsersProvider');
    return ctx;
}