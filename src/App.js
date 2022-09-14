import React, { useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import useLoginCheck from 'hooks/useLoginCheck';
import routes from 'routes';


const App = () => {
    const content = useRoutes(routes);
    useLoginCheck()

    return (
        <Wrapper>
            {content}
        </Wrapper>
    );
}
const Wrapper = styled.div``;

export default App;
