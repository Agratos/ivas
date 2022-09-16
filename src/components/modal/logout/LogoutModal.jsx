import React from 'react';

import { Dialog } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

import ColorDialogAction from 'components/modal/ColorDialogAction';

const LogoutModal = ({open, onClose, closeAction}) => {
    
    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason === 'backdropClick') {
                    return false;
                }
                onClose();
            }}
            maxWidth="md"
        >
            <ColorDialogAction
                gradientColor1={'black'}
                gradientColor2={'grey'}
                closeEvent={onClose}
                closeAction={closeAction}
                buttonTitle="로그아웃"
            />
        </Dialog>
    )
}

export default LogoutModal;