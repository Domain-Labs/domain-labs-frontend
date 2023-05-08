import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { bsc, bscTestnet, goerli, mainnet } from 'wagmi/chains';

import App from './App';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { publicProvider } from 'wagmi/providers/public';
import reportWebVitals from './reportWebVitals';

const { chains, provider, webSocketProvider } = configureChains(
  [
    goerli,
    bscTestnet,
    mainnet,
    // bsc,
    {
      ...bsc,
      rpcUrls: {
        default: {
          http: [`${process.env.REACT_APP_BINANCE_CHAIN_RPC}`],
        },
      },
    },
  ],
  [
    // alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  // <React.StrictMode>
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <App />
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
    </RainbowKitProvider>
  </WagmiConfig>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
