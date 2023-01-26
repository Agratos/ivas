import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { Paper } from '@mui/material';

import { ResponsiveBar } from '@nivo/bar';

const UserStatistic = () => {
    const test = [
        {
            'month': 'Fib',
            '객체 감지': 40,
            '쓰러짐 감지': 45,
            '얼굴 감지': 34,
            '알람 발생': 60
        },{
            'month': 'Mar',
            '객체 감지': 85,
            '쓰러짐 감지': 45,
            '얼굴 감지': 34,
            '알람 발생': 78
        },{
            'month': 'Apr',
            '객체 감지': 58,
            '쓰러짐 감지': 45,
            '얼굴 감지': 74,
            '알람 발생': 58
        },{
            'month': 'May',
            '객체 감지': 75,
            '쓰러짐 감지': 45,
            '얼굴 감지': 57,
            '알람 발생': 45
        },{
            'month': 'Jun',
            '객체 감지': 85,
            '쓰러짐 감지': 25,
            '얼굴 감지': 78,
            '알람 발생': 45
        },{
            'month': 'Jul',
            '객체 감지': 72,
            '쓰러짐 감지': 58,
            '얼굴 감지': 45,
            '알람 발생': 85
        },{
            'month': 'Aug',
            '객체 감지': 45,
            '쓰러짐 감지': 64,
            '얼굴 감지': 80,
            '알람 발생': 50
        },{
            'month': 'Sep',
            '객체 감지': 60,
            '쓰러짐 감지': 40,
            '얼굴 감지': 50,
            '알람 발생': 80
        },{
            'month': 'Oct',
            '객체 감지': 30,
            '쓰러짐 감지': 60,
            '얼굴 감지': 50,
            '알람 발생': 40
        }
    ]
    return (
        <Paper
            sx={{ width: '100%', m: 2, mt: 4, p: 3, backgroundColor: 'white' }}
            elevation={10}
        >
            <Body>
                <ResponsiveBar
                    data={test}
                    keys={['객체 감지','쓰러짐 감지','얼굴 감지','알람 발생']}
                    groupMode="grouped"
                    indexBy = {'month'}
                    margin={{ top: 50, right: 10, bottom: 50, left: 100 }}
                    padding={0.4}
                    innerPadding={2}
                    maxValue={100}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'set3' }}
                    enableGridX={false}
                    enableGridY={false}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 7.6]] }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'top',
                            direction: 'row',
                            justify: false,
                            translateX: 350,
                            translateY: -60,
                            itemsSpacing: 0,
                            itemWidth: 150,
                            itemHeight: 43,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 10,
                                    },
                                },
                            ],
                        },
                    ]}
                    role="application"
                />
            </Body>
        </Paper>
    )
}
const Body = styled.div`
    width: 100%;
    height: 400px;
`;

export default UserStatistic;