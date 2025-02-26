import React, {useState, useEffect, use} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers} from '../state/slices/userSlice';
import {Rootstate, AppDispatch} from '../state/store';
import {
  Container,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Pagination,
  CircularProgress,
} from '@mui/material';
import UserCard from '../components/UserCard';
import UserListItem from '../components/UserListItem';
import {User} from '../util/types';

const UserListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {users, loading} = useSelector((state: Rootstate) => state.users);
  const [search, setSearch] = useState<string>('');
  const [view, setView] = useState<'list' | 'card'>('list');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const filterUser = users.filter(
    (user: User) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h2>User List</h2>
      <TextField
        label="Search User"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, newView) => newView && setView(newView)}
        sx={{marginBottom: 2}}>
        <ToggleButton value="list">List View</ToggleButton>
        <ToggleButton value="card">Card View</ToggleButton>
      </ToggleButtonGroup>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid>
          {filterUser.map((user) =>
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
    </Container>
  );
};

export default UserListPage;
