import ContextWrapper from "./ContextWrapper";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContextProvider from "./utils/ContextProvider";

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