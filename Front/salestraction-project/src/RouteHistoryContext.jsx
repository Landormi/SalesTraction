// RouteHistoryContext.js
import { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const RouteHistoryContext = createContext();

export function RouteHistoryProvider({ children }) {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(null);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setPreviousPath(currentPath);
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <RouteHistoryContext.Provider value={{ previousPath }}>
      {children}
    </RouteHistoryContext.Provider>
  );
}
