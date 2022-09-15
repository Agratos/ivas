import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { Card } from '@mui/material';

const BarChart = ({ data }) => {
  return (
    <Card sx={{ height: 350, maxHeight: 400 }} elevation={10}>
      <ResponsiveBar
        data={data}
        keys={['cpu', 'mem', 'gpu', 'vmem', 'disk']}
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
        //ariaLabel="Nivo bar chart demo"
        //barAriaLabel={function (e) {
        //   return e.id + ': ' + e.formattedValue + ' in status: ' + e.indexValue;
        //}}
      />
    </Card>
  );
};

export default BarChart;
