import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
  isLoading: false,
  handleLoad() {},
  handleStart() {},
  handleComplete() {},
  shouldReload: false,
  handleReload() {},
});

export function useLoadingContext() {
  return useContext(LoadingContext);
}

export default function LoadingContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);

  function handleReload(bool) {
    setShouldReload(bool);
  }

  function handleLoad(bool) {
    setIsLoading(bool);
  }

  function handleStart(url, router) {
    //url !== router.asPath &&
    handleLoad(true);
  }

  function handleComplete(url, router) {
    // url === router.asPath &&
    handleLoad(false);
  }

  const ctxValue = {
    isLoading,
    shouldReload,
    handleLoad,
    handleStart,
    handleComplete,
    handleReload,
  };

  return (
    <LoadingContext.Provider value={ctxValue}>
      {children}
    </LoadingContext.Provider>
  );
}
