import 'react-toastify/dist/ReactToastify.css';

import { persistor, store } from './redux/store';

import ContextWrapper from './ContextWrapper';
import { DappProvider } from './contexts/dapp';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from './contexts/theme';

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
