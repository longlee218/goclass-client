import { createContext, useContext } from 'react';

import { useParams } from 'react-router';
import { useState } from 'react';

const RosterContext = createContext();

export const RosterProvider = ({ children }) => {
  const [rosterGroupIdFirst, setRosterGroupIdFirst] = useState('');
  return (
    <RosterContext.Provider
      value={{
        rosterGroupIdFirst: rosterGroupIdFirst ?? '',
        setRosterGroupIdFirst,
      }}
    >
      {children}
    </RosterContext.Provider>
  );
};
export const useRosterContext = () => useContext(RosterContext);
