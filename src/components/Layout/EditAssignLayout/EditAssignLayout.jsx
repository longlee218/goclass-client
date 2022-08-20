import Header from './Header/Header';
import React from 'react';
import { ToastContainer } from 'react-toastify';

const EditAssignLayout = ({ children }) => {
  return (
    <div id='main-layout'>
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

export default EditAssignLayout;
