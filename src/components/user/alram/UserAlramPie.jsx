import React from 'react';
import styled from 'styled-components';

import { ResponsivePie } from '@nivo/pie';


const UserAlramPie = () => {
    const data = [
        {
            id: 'CPU',
            label: 'CPU',
            value: '26'
        },{
            id: 'Memory',
            label: 'Memory',
            value: '38'
        },{
            id: 'Video Error',
            label: 'Video Error',
            value: '12'
        },{
            id: 'Service Fail',
            label: 'Service Fail',
            value: '24'
        },
    ]

    const getColor = (e) => {
        const id = e.id;
        switch(id){
            case 'CPU':
                return '#5f8bd9';
            case 'Memory':
                return '#4caf50';
            case 'Video Error':
                return '#ff9800';
            case 'Service Fail':
                return '#ef5350';
        }
    }

    return (
        <Wrapper>
            <Header>{`[ 장애 종류별 ]`}</Header>
            <PieWrapper>
                <ResponsivePie
                    data={data}
                    margin={{ top: 15, right: 60, bottom: 15, left: 10 }}
                    innerRadius={0.65}
                    enableArcLinkLabels={false}
                    colors={getColor}
                    legends={[
                        {
                            anchor: 'top',
                            direction: 'column',
                            justify: false,
                            translateX: 160,
                            translateY: -10,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemHeight: 22,
                            itemTextColor: '#999',
                            itemDirection: 'right-to-left',
                            itemOpacity: 1,
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </PieWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    width: 30%;
    height: 340px;
    margin-top: 24px;
`;
const Header = styled.div`
    font-size: 20px;
    color: #b3a2c7;
`;
const PieWrapper = styled.div`
    width: 100%;
    height: 340px;
    border: 3px solid #e6e0ec;
    padding: 16px;
    margin-top: 8px;
`;

export default UserAlramPie;