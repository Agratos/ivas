import React from 'react';
import styled from 'styled-components'
import { DialogTitle, Typography, Divider } from '@mui/material';

const ColorDialogTitle = ({ gradientColor1, gradientColor2, title }) => {
    return (
        <Wrapper>
            <DialogTitle
                sx={{
                    background: `linear-gradient(to right bottom, ${gradientColor1}, ${gradientColor2})`,
                }}
            >
                <Typography color="text.white">{title}</Typography>
            </DialogTitle>
            <Divider />
        </Wrapper>
    )
}
const Wrapper =styled.div``;

export default ColorDialogTitle;