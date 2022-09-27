import React from 'react';

import { Box, Typography, Tabs, Tab, Divider, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import { indigo } from '@mui/material/colors';

import GridItem from 'components/layout/container/GridItem';


const AdminServiceUsageDetail = () => {
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    border: `thick double ${indigo[50]}`,
                    borderRadius: '8px',
                    mt: 3,
                }}
            >
                {/* <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                <Tab label="제어 모듈" id={0} />
                <Tab label="영상 분석 모듈" id={1} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {controlData.map((data, index) => (
                        <ChartPanel key={index} index={index} data={data} />
                    ))}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {analysisData.map((data, index) => (
                        <ChartPanel key={index} index={index} data={data} />
                    ))}
                </TabPanel> */}
            </Box>
        </GridItem>
    )
}

export default AdminServiceUsageDetail;