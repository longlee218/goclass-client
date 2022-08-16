import Footer from './Footer';
import Header from './Header';
import React from 'react';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';
import SideBar from './SideBar';
import { ToastContainer } from 'react-toastify';

const DefaultLayout = ({ children }) => {
  return (
    <div id='main-layout'>
      <ScrollToTop />
      <ToastContainer autoClose={2000} />
      <Header />
      <div className='app__with-sidebar'>
        <div className='app__with-sidebar_wrap'>
          <SideBar />
        </div>
        <body className='app__with-sidebar_body'>
          <section>{children}</section>
        </body>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
