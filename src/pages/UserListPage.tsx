import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { logout } from "../state/slices/userAuthSlice";
import { useDispatch } from "react-redux";
import {
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import UserTable from "../components/UserTable";
import UserCardList from "../components/UserCardList";
import UserFormModal from "../components/UserFormModal";
import Header from "../components/Header";
import TableHeader from "../components/TableHeader";
import ViewToggle from "../components/ViewToggle";
import PaginationControls from "../components/PaginationControls";
import { User } from "../util/types";
import LoadingScreen from "../components/LoadingScreen";

const UserListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    users,
    loading,
    totalPageCount,
    createUser,
    modifyUser,
    removeUser,
    fetchUser,
  } = useUsers();
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"list" | "card">("list");
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUser(page);
  }, [fetchUser, page]);

  const filteredUsers = useMemo(
    () =>
      users.filter(({ first_name, last_name }) =>
        [first_name, last_name].some((name) =>
          name.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    [users, search],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  const handleSaveUser = useCallback(
    (userData: Partial<User>) => {
      editingUser
        ? modifyUser({ ...editingUser, ...userData })
        : createUser(userData);
      setEditingUser(null);
      setOpenModal(false);
    },
    [editingUser, modifyUser, createUser],
  );

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
    setOpenModal(true);
  }, []);

  const handleDeleteUser = useCallback(() => {
    if (confirmDelete !== null) {
      removeUser(confirmDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete, removeUser]);

  return (
    <>
      <Header onLogout={handleLogout} />
      <Container sx={{ paddingTop: "100px" }}>
        <section>
          <TableHeader
            title="Users"
            search={search}
            setSearch={setSearch}
            onOpenModal={() => {
              setEditingUser(null);
              setOpenModal(true);
            }}
          />
          <ViewToggle view={view} setView={setView} />
          {loading ? (
            <LoadingScreen />
          ) : view === "card" ? (
            <UserCardList
              users={filteredUsers}
              onEditUser={handleEditUser}
              onDeleteUser={setConfirmDelete}
            />
          ) : (
            <UserTable
              users={filteredUsers}
              onEditUser={handleEditUser}
              onDeleteUser={setConfirmDelete}
            />
          )}
          <div className="flex justify-end items-center my-2">
            <PaginationControls
              page={page}
              setPage={setPage}
              totalPageCount={totalPageCount}
            />
          </div>
        </section>
        <UserFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSaveUser}
          initialData={editingUser}
        />
        <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
          <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button color="error" onClick={handleDeleteUser}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default UserListPage;
