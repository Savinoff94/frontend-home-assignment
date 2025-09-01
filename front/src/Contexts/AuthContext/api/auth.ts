import { type User } from "../../../types";

export interface LoginSuccessPayload extends User  {
    token: string
}

export interface LoginFailPayload {
    message: string
}

export async function loginRequest(username: string, password: string): Promise<LoginSuccessPayload> {
    
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {    
      throw new Error((data as LoginFailPayload).message || 'Failed to log in');
    }
  
    return data as LoginSuccessPayload;
}