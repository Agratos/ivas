import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Card } from '@mui/material';

const BarChart = ({ data }) => {
    const test = [{cpu: '2.9', mem: '8.4', gpu: '0.0', vmem: '0.0', disk: '5.4', index:''}]
    return (
        <Card sx={{ height: 350, maxHeight: 400 }} elevation={10}>
        <ResponsiveBar
            data={test}
            keys={['cpu', 'mem', 'gpu', 'vmem', 'disk']}
            indexBy = {'index'}
            margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
            padding={0}
            innerPadding={10}
            maxValue={100}
            groupMode="grouped"
            layout="horizontal"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'set3' }}
            enableGridX={true}
            enableGridY={false}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: 'color', modifiers: [['darker', 7.6]] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 126,
                    translateY: -20,
                    itemsSpacing: 0,
                    itemWidth: 104,
                    itemHeight: 43,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
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
        </Card>
    );
};

export default BarChart;
