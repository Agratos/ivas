import React from 'react';
import { useRoutes } from 'react-router-dom';
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
