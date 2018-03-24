import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import store from 'createStore';
import theme from 'theme';

export default function TestProviders({ children }) {
  const history = createBrowserHistory();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>{children}</Router>
      </ThemeProvider>
    </Provider>
  );
}

TestProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
