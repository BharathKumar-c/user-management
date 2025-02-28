import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../state/slices/userSlice";
import { RootState, AppDispatch } from "../state/store";
import { User } from "../util/types";

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, totalPageCount } = useSelector(
    (state: RootState) => state.users,
  );

  const fetchUser = useCallback(
    (page: number) => {
      dispatch(fetchUsers(page));
    },
    [dispatch],
  );

  useEffect(() => {
    fetchUser(1); // Fetch page 1 on mount
  }, [fetchUser]);

  const createUser = (user: Partial<User>) => dispatch(addUser(user));
  const modifyUser = (user: User) => dispatch(updateUser(user));
  const removeUser = (id: number) => dispatch(deleteUser(id));

  return {
    users,
    loading,
    totalPageCount,
    fetchUser,
    createUser,
    modifyUser,
    removeUser,
  };
};
