export interface User {
    uuid: string;
    username: string;
    role: 'user' | 'admin';
}

export interface LoginSuccessPayload extends User  {
    token: string
}

export interface LoginFailPayload {
    message: string
}