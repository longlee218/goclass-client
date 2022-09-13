import React from 'react';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';
import ShortHeader from '../../ShortHeader';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

const ShortLayout = ({ children }) => {
  const title = useSelector((state) => state.config.title);
  const subTitle = useSelector((state) => state.config.subTitle);
  return (
    <div id='main-layout'>
      <ToastContainer autoClose={2000} />
      <ScrollToTop />
      <ShortHeader title={title} subTitle={subTitle} />
      <div className='app__with-sidebar'>
        <body className='app__with-sidebar_body--assignment'>
          <section>{children}</section>
        </body>
      </div>
    </div>
  );
};

export default ShortLayout;
