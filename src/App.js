import React, { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import styled from 'styled-components';

import routes from 'routes';

import MainPage from './pages/LoginPage';

const App = () => {
    const content = useRoutes(routes);
    return (
        <Wrapper>
            {content}
        </Wrapper>
    );
}
const Wrapper = styled.div``;

export default App;
