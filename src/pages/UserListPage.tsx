import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { logout } from "../state/slices/userAuthSlice";
import { useDispatch } from "react-redux";
import {
  Container,
  Button,
  Grid,
  Pagination,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import UserCard from "../components/UserCard";
import UserListItem from "../components/UserListItem";
import UserFormModal from "../components/UserFormModal";
import { User } from "../util/types";

const UserListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, createUser, modifyUser, removeUser, fetchUser } =
    useUsers();
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"list" | "card">("list");
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Fetch users when page changes
  useEffect(() => {
    fetchUser(page);
  }, [fetchUser, page]);

  const filteredUsers = useMemo(() => users, [users]);

  const handleSaveUser = (userData: Partial<User>) => {
    if (editingUser) {
      modifyUser({ ...editingUser, ...userData } as User);
    } else {
      createUser(userData);
    }
    setOpenModal(false);
    setEditingUser(null);
  };

  return (
    <Container>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>

      {/* Toggle Between List & Card View */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, newView) => newView && setView(newView)}
        sx={{ marginBottom: 2 }}
      >
        <ToggleButton value="list">List View</ToggleButton>
        <ToggleButton value="card">Card View</ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}
      >
        Add User
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {filteredUsers.map((user: User) =>
            view === "card" ? (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <UserCard user={user} />
              </Grid>
            ) : (
              <UserListItem key={user.id} user={user} />
            ),
          )}
        </Grid>
      )}

      <Pagination
        count={5}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ marginTop: 2 }}
      />

      <UserFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveUser}
      />

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              if (confirmDelete !== null) {
                removeUser(confirmDelete);
                setConfirmDelete(null);
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserListPage;
