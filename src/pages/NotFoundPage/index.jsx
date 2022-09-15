import { useNavigate } from 'react-router';
import { Box, Container, Typography } from '@mui/material';
import styled from 'styled-components';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const moveToMain = () => {
        navigate('/');
    }

    return (
        <Wrapper>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            alt="Under development"
                            src="/static/images/undraw_page_not_found_su7k.svg"
                            style={{
                                marginBottom: 50,
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 560,
                            }}
                        />
                    </Box>
                    <Typography align="center" color="textPrimary" variant="h1">
                        페이지를 찾을 수 없습니다.
                    </Typography>
                    <Typography align="center" color="textPrimary" variant="subtitle2" style={{marginTop:10}}>
                        <Button
                            onClick={moveToMain}
                        >
                            메인 페이지로 이동
                        </Button>
                    </Typography>
                </Container>
            </Box>
        </Wrapper>
    )
};
const Wrapper = styled.div`
    height: 100vh;
`;
const Button = styled.div`
    color: blue;
    :hover{
        cursor: pointer;
    }
`;

export default NotFoundPage;
