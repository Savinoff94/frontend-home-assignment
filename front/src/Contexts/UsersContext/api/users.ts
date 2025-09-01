import type { User } from "../../../types";
import api from "../../../api/axios";

export async function deleteUserRequest(uuid: string) {
    return await api.delete(`/users/${uuid}`);
}
  
export async function fetchUsersRequest() {
    const res = await api.get<User[]>("/users");
    return res.data;
}
  
export async function createUserRequest(
    user: Omit<User, "uuid"> & { password: string }
) {
    const res = await api.post<User>("/users", user);
    return res.data;
}