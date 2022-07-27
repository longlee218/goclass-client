import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import { DefaultLayout } from './components/Layout';
import Private from './pages/General/Private/Private';
import finalRoutes from './routes';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
  const loadingDOM = useSelector((state) => state.loading);

  return (
    <BrowserRouter>
      <Routes>
        {finalRoutes.map((route, index) => {
          const isPrivate = !!route.isPrivate;
          const roles = route.roles || [];
          let Page = route.component;
          let Layout = route.layout || DefaultLayout;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                isPrivate ? (
                  <Private key={index} roles={roles}>
                    {!loadingDOM.isShow && (
                      <Layout>
                        <Page />
                      </Layout>
                    )}
                  </Private>
                ) : (
                  <>
                    {!loadingDOM.isShow && (
                      <Layout>
                        <Page />
                      </Layout>
                    )}
                  </>
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
