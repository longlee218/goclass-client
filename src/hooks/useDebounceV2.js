import { useEffect } from 'react';
import { useState } from 'react';

function useDebouceV2(value, delay = 3000) {
  const [debouceValue, setDebouceValue] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouceValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouceValue;
}

export default useDebouceV2;
