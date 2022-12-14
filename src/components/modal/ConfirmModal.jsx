import React from 'react';

import { Dialog } from '@mui/material';
//import { deepPurple } from '@mui/material/colors';

import ColorDialogAction from 'components/modal/ColorDialogAction';

const ConfirmModal = ({text ,open, onClose, closeAction}) => {
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
                buttonTitle={text}
            />
        </Dialog>
    )
}

export default ConfirmModal;