export interface User {
    uuid: string;
    username: string;
    role: UserRole;
}

export type UserRole = 'user' | 'admin'

export interface BaseModal {
    close: () => void
}