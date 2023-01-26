import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import UploadRoundedIcon from '@mui/icons-material/UploadRounded';

import stringSliceByByte from 'utils/stringSliceByByte';

const UserLearningCard = ({id, title, image, setData}) => {
    const inputRef = useRef();
    const [showImages, setShowImages] = useState([...image]);

    const openInput = () => {
        inputRef.current.click()
    }

    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
    
        for (let i = 0; i < imageLists.length; i++) {
          const currentImage = { url: URL.createObjectURL(imageLists[i]), name: imageLists[i].name}
          imageUrlLists.unshift(currentImage);
        }

        setShowImages(imageUrlLists);
      };

    const stringLengthDelete = (str) => {
        const stringByteLength = (function(s,b,i,c){
            for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
            return b
        })(str);
        let temp = stringSliceByByte(str, 26);
        if(stringByteLength > 26) temp += '...';
        return temp
    }

    return (
        <Wrapper>
            <Header>
                <Title>{`Class ${id}`}</Title>
                <TitleInput defaultValue={title} />
            </Header>
            <Body>
                <BodyHeader>
                    <BodyHeaderTitle>Data</BodyHeaderTitle>
                    <ImageUploadButton onClick={openInput}>
                        <UploadRoundedIcon 
                            style={{
                                backgroundColor: '#eef0f2',
                                color: '#56677b',
                                borderRadius: '50%', 
                                padding: '3px',
                                fontSize: '30px',
                                marginBottom: '4px'
                            }}
                        />
                        upload
                    </ImageUploadButton>
                    <label onChange={handleAddImages} style={{display:'none'}}>
                        <Input 
                            type='file' 
                            ref={inputRef}
                            multiple
                        />
                    </label>
                </BodyHeader>
                <BodyBody>
                    {showImages.slice(0,6).map(({url, name},index) => (
                        <ImageWrapper key={`${id}-image-${index}`}>
                            <Image src={url} style={{marginTop: '4px'}} />
                            <ImageTitle>{stringLengthDelete(name)}</ImageTitle>
                        </ImageWrapper>
                    ))}
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
    font-size: 20px;
    padding-left: 8px;
`;
const Body = styled.div`
    background-color: #fff;
    margin-top:  12px;
    border-radius: 16px;
    padding: 10px;
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
    width: 120px;
`;
const BodyHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
`;
const BodyBody = styled.div`
    display: flex;
    height: 200px;
    border: 0.5px solid #cbe7eb;
    margin-top: 8px;
    border-radius: 16px;
    padding: 8px;
    flex-wrap: wrap;
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
    cursor: pointer;
`;
const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 60px;
    margin: 0 6px;
`;
const Image = styled.img`
    margin: auto;
    width: 72px;
    height: inherit;
`;
const ImageTitle = styled.div`
    font-size: 10px;
    width: 84px;
    word-break: break-all;
    text-overflow: ellipsis;
`;
const Input = styled.input`
    display: none;
`;

export default UserLearningCard;