import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './store';

import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

import { BrowserRouter } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
              <StyledEngineProvider injectFirst>
                  <ThemeProvider theme={theme}>
                      <GlobalStyles />
                      <App />
                  </ThemeProvider>
              </StyledEngineProvider>
          </BrowserRouter>
      </PersistGate>
  </Provider>,
  document.getElementById('root'),
);