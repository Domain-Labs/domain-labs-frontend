import binanceImage from './assets/image/svgs/binance-logo.svg';
import ensImage from './assets/image/svgs/ens-logo.svg';

export const BASE_API_URL =
  'https://tuy2zvjt24.execute-api.us-east-1.amazonaws.com';

// export const ethereumChain = 5
// export const bscChain = 97;

export const ethereumChain = 1;
export const bscChain = 56;

/**
 * "5": ethereum chain
 * "97": bsc chain
 *  */
export const contractAddresses = {
  [ethereumChain]: '0xD524ec8776987D4Ce7c5aAE5F92B92bc6b2AFf55',
  [bscChain]: '0x490DEc2ccBB7f3fe6EaB8690fEA3bab0404C1e0B',
};

export const chainIdHexes = {
  1: '0x1',
  5: '0x5',
  56: '0x38',
  97: '0x61',
};

export const chainNames = {
  1: 'ethereum',
  5: 'goerli',
  56: 'bsc',
  97: 'bscTest',
};

export const rpcUrls = {
  1: 'https://mainnet.infura.io/v3/610b716a2a894e6dad5ed94aa38e5c85',
  5: 'https://goerli.infura.io/v3/610b716a2a894e6dad5ed94aa38e5c85',
  56: 'https://bsc-dataseed.binance.org',
  97: 'https://data-seed-prebsc-1-s3.binance.org:8545',
};

export const domainSuffixes = {
  1: 'eth',
  5: 'eth',
  56: 'bnb',
  97: 'bnb',
};

export const domainExtensions = {
  1: 'ETH',
  5: 'ETH',
  56: 'BNB',
  97: 'BNB',
};

export const domainLogoImages = {
  1: ensImage,
  5: ensImage,
  56: binanceImage,
  97: binanceImage,
};

export const domainNames = {
  1: 'ENS',
  5: 'ENS',
  56: 'BNB',
  97: 'BNB',
};

export const linkArray = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Blog',
    link: '/blog',
  },
  // {
  //   name: 'Pricing',
  //   link: '/pricing',
  // },
  {
    name: 'Clio',
    link: '/clio',
  },
  {
    name: 'Team',
    link: '/team',
  },
  {
    name: 'Profile',
    link: '/profile',
  },
];

export const secondsInDay = 24 * 60 * 60 * 1000;

export const ethereumChainId = 1;
export const bscChainId = 56;

export const goerliChainId = 5;
export const bscTestnetChainId = 97;

export const chainIds = {
  mainnet: [ethereumChainId, bscChainId],
  testnet: [goerliChainId, bscTestnetChainId],
  all: [goerliChainId, bscTestnetChainId, ethereumChainId, bscChainId],
};
