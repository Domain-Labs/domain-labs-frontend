import { useState } from "react";
import { DappContext } from "./context";
import { io } from "socket.io-client";

const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('day-theme');
  const [cartStatus, setCartStatus] = useState({});
  const [newCartStatus, setNewCartStatus] = useState([]);
  // [{
  //   name: domainName,
  //   isRegistered: undefined,
  //   isInCart: false,
  // }]
  const [clioSocket, setClioSocket] = useState(io("/clio"));

  return (
    <DappContext.Provider
      value={{
        theme,
        setTheme,
        cartStatus,
        setCartStatus,
        newCartStatus,
        setNewCartStatus,
        clioSocket,
        setClioSocket,
      }}
    >
      {children}
    </DappContext.Provider>
  );
};

export default ContextProvider;
