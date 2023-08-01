import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { bsc, mainnet } from 'wagmi/chains';

import App from './App';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { publicProvider } from 'wagmi/providers/public';
import reportWebVitals from './reportWebVitals';

require('@solana/wallet-adapter-react-ui/styles.css');

const solana_network =
  process.env.SOLANA_NETWORK || 'https://api.mainnet-beta.solana.com';
const { chains, provider, webSocketProvider } = configureChains(
  [
    // goerli,
    // bscTestnet,
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

const wallets = [new PhantomWalletAdapter()];

root.render(
  // <React.StrictMode>
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <ConnectionProvider endpoint={solana_network}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
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
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </RainbowKitProvider>
  </WagmiConfig>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
