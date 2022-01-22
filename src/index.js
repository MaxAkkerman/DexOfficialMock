import './index.scss';

import { StyledEngineProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Alert from './components-v2/Alert';

import App from './App';
import { reduxStore } from './lib/redux';

ReactDOM.render(
  <Provider store={reduxStore}>
    <Router basename={process.env.NODE_ENV === "development" ? "" : process.env.PUBLIC_URL} >
      <StyledEngineProvider injectFirst>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={10000}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          content={(key, { message, type }) => (
            <Alert id={key} message={message} type={type} />
          )}
        >
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </SnackbarProvider>
      </StyledEngineProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
