import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertSnackbar = ({ open, onClose, duration, severity, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
            <Alert
                severity={severity}
                elevation={6}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default React.memo(AlertSnackbar);
