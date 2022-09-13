import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import MainPage from './pages/LoginPage';

const App = () => {
  return (
    <Wrapper>
    {/* fallback 변경 예정 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Suspense>
    </Wrapper>
  );
}
const Wrapper = styled.div``;

export default App;
