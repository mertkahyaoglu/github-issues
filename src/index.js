import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';
import { normalize } from 'polished';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import store from './createStore';
import App from './layouts/App';
import theme from './theme';

const history = createBrowserHistory();

/* eslint-disable no-unused-expressions*/
injectGlobal`${normalize()}`;
injectGlobal`
  html {
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    &:hover {
      color: #0366d6;
    }
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
