import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { User } from "../util/types";

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEditUser,
  onDeleteUser,
}) => {
  return (
    <TableContainer component={Paper} sx={{ my: "10px" }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#fafafa" }}>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Avatar src={user.avatar} sx={{ mr: 1 }} />
                  {user.email}
                </Box>
              </TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onEditUser(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => onDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
