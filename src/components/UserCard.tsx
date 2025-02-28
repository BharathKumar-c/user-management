import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { User } from "../util/types";

interface UserCardProps {
  user: User;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onEditUser,
  onDeleteUser,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      sx={{
        position: "relative",
        textAlign: "center",
        padding: 2,
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: hovered ? "rgba(0, 0, 0, 0.2)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          transition: "0.3s",
        }}
      >
        {hovered && (
          <Box display="flex" gap={1}>
            <IconButton
              sx={{ backgroundColor: "#6C63FF", color: "white" }}
              onClick={() => onEditUser(user)}
            >
              <Edit />
            </IconButton>
            <IconButton
              sx={{ backgroundColor: "#FF4C4C", color: "white" }}
              onClick={() => onDeleteUser(user.id)}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>
      <Avatar
        src={user.avatar}
        sx={{ width: 60, height: 60, margin: "auto" }}
      />
      <CardContent>
        <Typography variant="h6">
          {user.first_name} {user.last_name}
        </Typography>
        <Typography color="textSecondary">{user.email}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
