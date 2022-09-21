import { createContext, useState } from 'react';

import { useContext } from 'react';
import { useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [titleHeader, setTitleHeader] = useState('');
  const [screenRole, setScreenRole] = useState('');

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/teacher')) {
      setScreenRole('teacher');
    }
    if (pathname.startsWith('/student')) {
      setScreenRole('student');
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        titleHeader,
        screenRole,
        setTitleHeader,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
