import { Card, CardContent, Typography } from "@mui/material"
import { useAuth } from "../../Contexts/AuthContext/AuthContext"
export function MyAccount() {
    const { user } = useAuth()
    return (
        <Card sx={{ maxWidth: 400, mb: 2 }}>
            <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                ID: {user?.uuid}
                </Typography>
                <Typography variant="h6">{user?.username}</Typography>
                <Typography variant="body2" color="text.secondary">
                Role: {user?.role}
                </Typography>
            </CardContent>
        </Card>
    )
}