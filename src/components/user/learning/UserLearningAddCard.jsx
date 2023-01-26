import React from 'react';
import styled from 'styled-components';

const UserLearningAddCard = ({onClick}) => {
    return (
        <Wrapper>
            <Header>

            </Header>
            <Body>
                <AddButton onClick={onClick}>+</AddButton>
            </Body>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    background-color: #f2f5f9;
    //width: 33%;
    width: 316px;
    margin: 16px 8px;
`;
const Header = styled.div`
    display: flex;
    font-size: 24px;
    height: 22px;
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: cener;
    align-items: center;
    background-color: #fff;
    margin-top:  16px;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 1px 1px 1px 1px #dddfe9;
    height: 284px;
`;
const AddButton = styled.button`
    font-size: 50px;
    border: none;
    background-color: #e8eaee;
    color: #7080fc;
    border-radius: 50%;
    padding: 10px 26px;
    margin: auto;
    cursor: pointer;
`;


export default UserLearningAddCard;