import { Button, TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import type { User } from "../../../../../types";

interface UserRowProps {
    currentUserUuid?: string;
    onDelete: (user: any) => void;
    user: User
};
// interface UserRowProps extends User {
//     currentUserUuid?: string;
//     onDelete: (user: any) => void;
// };
  
export const UserRow = memo(function UserRow({
    user,
    currentUserUuid,
    onDelete,
}: UserRowProps) {
    return (
      <TableRow>
        <TableCell>{user.uuid}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          <Button
            color="error" // better than `variant="delete"`
            size="small"
            disabled={currentUserUuid === user.uuid}
            onClick={() => onDelete(user)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
});