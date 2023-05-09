import ContextWrapper from "./ContextWrapper";
import { toast, ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from "socket.io-client";
import ContextProvider from "./utils/ContextProvider";
import { useEffect } from "react";
import { useDappContext } from "./utils/context";

const App = () => {

  return (
    <ContextProvider>
      < ContextWrapper />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ContextProvider>
  );
};

export default App;