import { type User } from "../../../types";
import api from "../../../api/axios";

export interface LoginSuccessPayload extends User  {
    token: string
}

export interface LoginFailPayload {
    message: string
}

export async function loginRequest(username: string, password: string): Promise<LoginSuccessPayload> {
    try {
        const res = await api.post<LoginSuccessPayload>("/login", {
            username,
            password,
        });
        return res.data;
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to log in";
        throw new Error(message);
    }
}