import React from "react";
import { Grid } from "@mui/material";
import UserCard from "./UserCard";
import { User } from "../util/types";

interface UserCardListProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

const UserCardList: React.FC<UserCardListProps> = ({
  users,
  onEditUser,
  onDeleteUser,
}) => {
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item xs={12} sm={6} md={4} key={user.id}>
          <UserCard
            user={user}
            onEditUser={onEditUser}
            onDeleteUser={onDeleteUser}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserCardList;
