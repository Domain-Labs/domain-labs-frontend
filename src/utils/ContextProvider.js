import { useState } from "react";
import { DappContext } from "./context";

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('day-theme');
  const [cartStatus, setCartStatus] = useState({});

  return (
    <DappContext.Provider
      value={{
        theme,
        setTheme,
        cartStatus,
        setCartStatus,
      }}
    >
      {children}
    </DappContext.Provider>
  );
};

export default ContextProvider;
