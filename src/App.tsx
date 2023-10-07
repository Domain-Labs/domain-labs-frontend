import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistor, store } from './redux/store';

import ContextWrapper from './ContextWrapper';
import { DappProvider } from 'contexts/dapp';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'contexts/theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <DappProvider>
            <ThemeProvider>
              <ContextWrapper />
            </ThemeProvider>
          </DappProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
