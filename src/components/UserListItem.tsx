import React from 'react';
import {User} from '../util/types';

interface UserListItemProps {
  user: User;
}

const UserListItem: React.FC<UserListItemProps> = ({user}) => {
  return <div>UserListItem</div>;
};

export default UserListItem;
