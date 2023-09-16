import './index.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig } from 'wagmi';
import { bsc, mainnet } from 'wagmi/chains';
import {
  injectedWallet,
  metaMaskWallet,
  phantomWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';

import App from './App';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import reportWebVitals from './reportWebVitals';

require('@solana/wallet-adapter-react-ui/styles.css');

const solana_network =
  // process.env.SOLANA_NETWORK ||
  'https://red-bitter-brook.solana-mainnet.discover.quiknode.pro/6ef6b38be9eb778256aafcd3e4907da03585b0d2/';
const { chains, publicClient } = configureChains(
  [mainnet, bsc],
  [
    alchemyProvider({ apiKey: '8MZNUTLCQugMhLsclCvpCahkvf2TmKun' }),
    publicProvider(),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: 'DomainLabs',
    wallets: [
      phantomWallet({ chains }),
      metaMaskWallet({ chains, projectId: 'domainlabs' }),
      injectedWallet({ chains }),
      // trustWallet({ chains, projectId: 'domainlabs' }),
    ],
  },
]);

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const solanaWallets = [new TrustWalletAdapter(), new PhantomWalletAdapter()];

root.render(
  // <React.StrictMode>
  <WagmiConfig config={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <ConnectionProvider endpoint={solana_network}>
        <WalletProvider wallets={solanaWallets} autoConnect>
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
