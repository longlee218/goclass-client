import Header from './Header/Header';
import React from 'react';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';

const AssignLayout = ({ children }) => {
  return (
    <div id='main-layout'>
      {/* <LoadingBar /> */}
      <ScrollToTop />
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
