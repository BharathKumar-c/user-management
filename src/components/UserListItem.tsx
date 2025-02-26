import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@mui/material';
import {User} from '../util/types';

interface UserListItemProps {
  user: User;
}

const UserListItem: React.FC<UserListItemProps> = ({user}) => {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={user.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={`${user.first_name} ${user.last_name}`}
          secondary={user.email}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default UserListItem;
