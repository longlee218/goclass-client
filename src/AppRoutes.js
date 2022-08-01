import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './components/Layout';
import Private from './pages/General/Private/Private';
import React from 'react';
import finalRoutes from './routes';
import { useSelector } from 'react-redux';

const PageComponent = (isPrivate, roles, Page, Layout) => {
  const mainPage = (
    // <React.Suspense fallback={<>Đang tải...</>}>
    <Layout>
      <Page />
    </Layout>
    // </React.Suspense>
  );
  return isPrivate ? <Private roles={roles}>{mainPage}</Private> : mainPage;
};

const makeNestedRoutes = (routes, loadingDOM) => {
  if (!Array.isArray(routes)) {
    const isPrivate = !!routes.isPrivate;
    const roles = routes.roles || [];
    const Page = routes.page;
    const Layout = routes.layout || DefaultLayout;

    return (
      <Route
        key={routes.key}
        path={routes.path}
        element={
          !loadingDOM.isShow && PageComponent(isPrivate, roles, Page, Layout)
        }
      />
    );
  }

  return routes.map((route, index) => {
    const isPrivate = !!route.isPrivate;
    const roles = route.roles || [];
    const Page = route.page;
    const Layout = route.layout || DefaultLayout;
    return (
      <Route
        key={index}
        path={route.path}
        element={
          !loadingDOM.isShow && PageComponent(isPrivate, roles, Page, Layout)
        }
      >
        {makeNestedRoutes(route?.child || [], loadingDOM)}
      </Route>
    );
  });
};

const AppRoutes = () => {
  const loadingDOM = useSelector((state) => state.loading);
  return (
    <BrowserRouter>
      <Routes>
        {makeNestedRoutes(finalRoutes, loadingDOM)}
        <Route path='*' element={<>404</>} />
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
