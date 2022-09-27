import React from 'react';
import styled from 'styled-components';

import { Typography, Divider, Stack } from '@mui/material';

import BarChart from '../BarChart';

const ChartPanel = ({ index, data }) => {
    return (
        <Wrapper>
            <Stack
                direction={{ xs: 'row', sm: 'row' }}
                spacing={1}
                sx={{ py: index !== 0 ? 1 : 0, mt: index !== 0 ? 2 : 0 }}
            >
                <Typography>{`#${index + 1} Status:`}</Typography>
                <Typography color={data.status === 0 ? 'green' : 'red'}>
                    {data.status === 0 ? '양호' : `불량 (${data.description})`}
                </Typography>
            </Stack>
            <BarChart data={[data]} />
            <Divider sx={{ py: 1 }} />
        </Wrapper>
    );
};
const Wrapper = styled.div``;

export default ChartPanel;