import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from '../state/slices/userSlice';
import {RootState, AppDispatch} from '../state/store';
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
} from '@mui/material';
import UserCard from '../components/UserCard';
import UserListItem from '../components/UserListItem'; // ✅ Keep List Item
import UserFormModal from '../components/UserFormModal';
import {User} from '../util/types';

const UserListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {users, loading} = useSelector((state: RootState) => state.users);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<'list' | 'card'>('list'); // ✅ View toggle
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handleSaveUser = (userData: Partial<User>) => {
    if (editingUser) {
      dispatch(updateUser({...editingUser, ...userData} as User));
    } else {
      dispatch(addUser(userData));
    }
    setOpenModal(false);
    setEditingUser(null);
  };

  return (
    <Container>
      <h2>User List</h2>

      {/* Toggle Between List & Card View */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, newView) => newView && setView(newView)}
        sx={{marginBottom: 2}}>
        <ToggleButton value="list">List View</ToggleButton>
        <ToggleButton value="card">Card View</ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModal(true)}>
        Add User
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {users.map((user: User) =>
            view === 'card' ? (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <UserCard user={user} />
              </Grid>
            ) : (
              <UserListItem key={user.id} user={user} />
            )
          )}
        </Grid>
      )}

      <Pagination
        count={5}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{marginTop: 2}}
      />

      <UserFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveUser}
      />

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => dispatch(deleteUser(confirmDelete!))}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserListPage;
