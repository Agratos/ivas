import React from 'react';
import styled from 'styled-components';

import { ResponsiveHeatMap } from '@nivo/heatmap';


const UserAlramHeatmap = () => {
    const month = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const makeData = () => {
        const result = [];
        month.forEach((id) => {
            const temp = [];
            for(let i = 0; i < 24; i++){
                temp.push({
                    x: i,
                    y: Math.random().toFixed(3)
                })
            }

            result.push({id:id, data: temp})
        })
       
        return result;
    }

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
            <Header>{`[ 장애 발생 분포도 / 서비스 성공률 ]`}</Header>
            <PieWrapper>
                <ResponsiveHeatMap
                    data={makeData()}
                    margin={{ top: 20, right: 20, bottom: 47, left: 60 }}
                    valueFormat=" >-.0%"
                    enableGridX={true}
                    axisTop={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '시간',
                        legendPosition: 'middle',
                        legendOffset: 40
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '요일',
                        legendPosition: 'middle',
                        legendOffset: -50
                    }}
                    colors={{
                        type: 'sequential',
                        scheme: 'blues',
                        minValue: 0,
                        maxValue: 1
                    }}
                    inactiveOpacity={0.2}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                '0.7'
                            ]
                        ]
                    }}
                    legends={[]}
                />
            </PieWrapper>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    width: 68%;
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

export default UserAlramHeatmap;