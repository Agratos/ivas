import React from 'react';

import { DialogActions, Button } from '@mui/material';
import { indigo } from '@mui/material/colors';


const ColorDialogAction = ({  gradientColor1,gradientColor2,closeEvent,closeAction,buttonTitle,}) => {
    return (
        <DialogActions
            sx={{
                background: `linear-gradient(to right bottom, ${gradientColor2}, ${gradientColor1})`,
            }}
        >
            <Button
                onClick={closeEvent}
                sx={{ color: `${indigo[100]}`, fontWeight: 'bold' }}
            >
                취소
            </Button>
            <Button onClick={closeAction} sx={{ color: 'white', fontWeight: 'bold' }}>
                {buttonTitle === '' ? '로그인' : buttonTitle}
            </Button>
        </DialogActions>
      );
}

export default ColorDialogAction;