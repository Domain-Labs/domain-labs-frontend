import ContextWrapper from "./ContextWrapper";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { DappProvider } from "./contexts/dapp";
import { ThemeProvider } from "./contexts/theme";

import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DappProvider>
          <ThemeProvider>
            <ContextWrapper />
          </ThemeProvider>
        </DappProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;