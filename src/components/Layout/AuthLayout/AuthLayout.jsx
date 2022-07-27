import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer } from 'react-toastify';

const AuthLayout = ({ children }) => {
  return (
    <div id='auth-layout'>
      <ToastContainer autoClose={2000} />
      <body className='auth__body'>{children}</body>
    </div>
  );
};

export default AuthLayout;
