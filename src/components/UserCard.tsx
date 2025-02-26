import React from 'react';
import {User} from '../util/types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
  return <div>UserCard</div>;
};

export default UserCard;
