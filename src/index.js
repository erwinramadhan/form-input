import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './page/Login';
import Form from './page/Form';
// import Home from './page/Home';
// import Profile from './page/Profile';
// import History from './page/History';
import NewHistory from './page/NewHistory';

const theme = createTheme({
  typography: {
    fontFamily: 'Plus Jakarta Sans, Roboto',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Plus Jakarta Sans, Roboto';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: '/input',
    element: <Form />
  },
  // {
  //   path: "/home",
  //   element: <Home />
  // },
  // {
  //   path: "/profil",
  //   element: <Profile />
  // },
  {
    path: "/riwayat",
    element: <NewHistory />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
