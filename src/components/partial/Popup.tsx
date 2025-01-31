import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material'
import { AlertColor } from '@mui/material'
import React, { useState } from 'react'

interface popupProps {
    message: string
    severity: AlertColor
    isShow: boolean,
    setParentShowing: (val: boolean) => void
}

const Popup = ({ message, severity, isShow, setParentShowing }: popupProps) => {
    const [showSnack, setShowSnack] = useState<boolean>(isShow)
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowSnack(false);
        setParentShowing(false)
    };

    return (
        <Snackbar open={showSnack} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Popup