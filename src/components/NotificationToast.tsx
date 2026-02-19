import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, type AlertColor } from '@mui/material';
import { useNotifications } from '../hooks/useNotifications';

interface NotificationToastProps {
  userId: string;
  severity?: AlertColor; // success, info, warning, error
}

const NotificationToast: React.FC<NotificationToastProps> = ({ 
  userId, 
  severity = "info" 
}) => {
  const { notification } = useNotifications(userId);
  const [open, setOpen] = useState(false);

  // Trigger snackbar when a new notification object arrives
  useEffect(() => {
    if (notification) {
      setOpen(true);
    }
  }, [notification]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity} 
        variant="filled" 
        sx={{ width: '100%' }}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationToast;