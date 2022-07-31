import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './components/Layout';
import Private from './pages/General/Private/Private';
import React from 'react';
import finalRoutes from './routes';
import { useSelector } from 'react-redux';

const makeNestedRoutes = (routes, loadingDOM) => {
  if (routes?.child && routes.child.length !== 0) {
    return makeNestedRoutes(routes.child, loadingDOM);
  }

  return routes.map((route, index) => {
    const isPrivate = !!route.isPrivate;
    const roles = route.roles || [];
    const Page = route.page;
    const Layout = route.layout || DefaultLayout;

    const mainPage = !loadingDOM.isShow && (
      <Layout>
        <Page />
      </Layout>
    );

    return (
      <Route
        key={index}
        path={route.path}
        element={
          isPrivate ? (
            <Private key={index} roles={roles}>
              {mainPage}
            </Private>
          ) : (
            { mainPage }
          )
        }
      />
    );
  });
};

const AppRoutes = () => {
  const loadingDOM = useSelector((state) => state.loading);
  return (
    <BrowserRouter>
      <Routes>
        {makeNestedRoutes(finalRoutes, loadingDOM)}
        {/* {finalRoutes.map((route, index) => {
          const isPrivate = !!route.isPrivate;
          const roles = route.roles || [];
          const Page = route.page;
          const Layout = route.layout || DefaultLayout;

          const mainPage = !loadingDOM.isShow && (
            <Layout>
              <Page />
            </Layout>
          );

          const makeNestedRoutes = () => {};

          return (
            <Route
              key={index}
              path={route.path}
              element={
                isPrivate ? (
                  <Private key={index} roles={roles}>
                    {mainPage}
                  </Private>
                ) : (
                  { mainPage }
                )
              }
            />
          );
        })} */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
