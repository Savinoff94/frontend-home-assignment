import type { User } from "../../../types";

export async function deletehUsersRequest(uuid: string, token: string) {
    return await fetch(`/api/users/${uuid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function fetchUsersRequest(token: string) {
    return await fetch('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function createUserRequest(
    user: Omit<User, "uuid"> & { password: string; },
    token: string
) {
    return await fetch('/api/users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });
}