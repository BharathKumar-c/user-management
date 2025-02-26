import React from 'react';
import {Card, CardContent, Typography, Avatar} from '@mui/material';
import {User} from '../util/types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
  return (
    <Card sx={{display: 'flex', alignItems: 'center', padding: 2}}>
      <Avatar src={user.avatar} sx={{marginRight: 2}} />
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
