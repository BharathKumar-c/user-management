import React from 'react';
import {Snackbar, Alert} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../state/store';
import {hideNotification} from '../state/slices/notificationSlice';

const Notification = () => {
  const dispatch = useDispatch();
  const {message, open, type} = useSelector(
    (state: RootState) => state.notification
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideNotification())}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      <Alert
        onClose={() => dispatch(hideNotification())}
        severity={type}
        variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
