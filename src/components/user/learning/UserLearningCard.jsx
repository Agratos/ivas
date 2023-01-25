import React from 'react';
import styled from 'styled-components';

import UploadRoundedIcon from '@mui/icons-material/UploadRounded';

const UserLearningCard = ({index}) => {
    return (
        <Wrapper>
            <Header>
                <Title>{`Class ${index}`}</Title>
                <TitleInput />
            </Header>
            <Body>
                <BodyHeader>
                    <BodyHeaderTitle>Data</BodyHeaderTitle>
                    <ImageUploadButton>
                        <UploadRoundedIcon 
                            style={{
                                backgroundColor: '#eef0f2', 
                                borderRadius: '50%', 
                                padding: '3px',
                                fontSize: '30px',
                                marginBottom: '4px'
                            }}
                        />
                        upload
                    </ImageUploadButton>
                </BodyHeader>
                <BodyBody>

                </BodyBody>
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
`;
const Body = styled.div`
    background-color: #fff;
    margin-top:  16px;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 1px 1px 1px 1px #dddfe9;
`;
const Title = styled.div``;
const TitleInput = styled.input`
    border-radius: 8px;
    border: 0.5px solid #c0c8fd;
    :focus {
        outline: none;
    }
    margin-left: 16px;
    padding: 0 8px;
`;
const BodyHeader = styled.div`
    display: flex;
    justify-content: space-between;

`;
const BodyBody = styled.div`
    width: 100%;
    height: 200px;
`;
const BodyHeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 20px;
`;
const ImageUploadButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #7464e7;
    border: none;
    background-color: #fff;
    font-size: 16px;
`;

export default UserLearningCard;