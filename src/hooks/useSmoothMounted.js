import { useEffect, useState } from 'react';

function useSmoothMounted(isMounted, delayTime = 30) {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}

export default useSmoothMounted;
