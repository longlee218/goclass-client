import Header from './Header/Header';
import LoadingBar from '../../LoadingBar/LoadingBar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const AssignLayout = ({ children }) => {
  return (
    <div id='main-layout'>
      {/* <LoadingBar /> */}
      <ToastContainer autoClose={2000} />
      <Header />
      <div className='app__with-sidebar'>
        <body className='app__with-sidebar_body--assignment'>
          <section>{children}</section>
        </body>
      </div>
    </div>
  );
};

export default AssignLayout;
