import { createContext, useState } from 'react';

import { useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [titleHeader, setTitleHeader] = useState('');

  return (
    <AppContext.Provider
      value={{
        titleHeader,
        setTitleHeader,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
