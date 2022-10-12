import Header from './Header/Header';
import React from 'react';
import { RosterProvider } from '../../../hooks/useRosterContext';
import ScrollToTop from '../../ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';

const AssignLayoutNoDirector = ({ children }) => {
  return (
    <div id='main-layout'>
      <ScrollToTop />
      <ToastContainer autoClose={2000} />
      <RosterProvider>
        <Header />
        <div>
          <body className='app__with-sidebar_body--assignment'>
            <section>{children}</section>
          </body>
        </div>
      </RosterProvider>
    </div>
  );
};

export default AssignLayoutNoDirector;
