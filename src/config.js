import ensImage from './assets/image/svgs/ens-logo.svg';
import binanceImage from './assets/image/svgs/binance-logo.svg';

export const ethereumChain = 5
export const bscChain = 97;

/**
 * "5": ethereum chain
 * "97": bsc chain 
 *  */
export const contractAddresses = {
    [ethereumChain]: "0xD524ec8776987D4Ce7c5aAE5F92B92bc6b2AFf55",
    [bscChain]: "0x490DEc2ccBB7f3fe6EaB8690fEA3bab0404C1e0B"
}

export const chainNames = {
    [ethereumChain]: "ethereum",
    [bscChain]: "bsc"
}

export const rpcUrls = {
    [ethereumChain]: "https://goerli.infura.io/v3/",
    [bscChain]: "https://data-seed-prebsc-1-s3.binance.org:8545"
}

export const domainSuffixes = {
    [ethereumChain]: "eth",
    [bscChain]: "bnb"
}

export const chainIdHexes = {
    [ethereumChain]: "0x5",
    [bscChain]: '0x61'
}

export const domainLogoImages = {
    [ethereumChain]: ensImage,
    [bscChain]: binanceImage
}

export const domainNames = {
    [ethereumChain]: "ENS",
    [bscChain]: "BNB"
}

export const linkArray = [
    {
        name: 'Home',
        link: '/home',
    },
    {
        name: 'Pricing',
        link: '/pricing',
    },
    {
        name: 'Clio',
        link: '/clio',
    },
    {
        name: 'Profile',
        link: '/profile',
    },
]

export const secondsInDay = 24 * 60 * 60;
export const secondsInMonth = secondsInDay * 30;

export const ethereumChainId = 1;
export const bscChainId = 56;

export const goerliChainId = 5;
export const bscTestnetChainId = 97;

export const chainIds = {
    "mainnet": [ethereumChainId, bscChainId],
    "testnet": [goerliChainId, bscTestnetChainId],
}

export const chainParams = {
    [97]: {
        usdcAddress: '0x6d20B2670DA3aEc925F5Dc7e638165E462FEA7c9',
        clioPaymentAddress: '0xc51602C214cACBB813Aa29fd2bf2F31BD408437a',
    },
    [5]: {
        usdcAddress: '0xABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD',
        clioPaymentAddress: '0xABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD',
    },
    [1]: {
        usdcAddress: '0xABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD',
        clioPaymentAddress: '0xABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD',
    },
    [56]: {
        usdcAddress: '0xABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD',
        clioPaymentAddress: '0xABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD',
    },
}

export const clioSubscriptionDurations = [
    {
        label: 'One Month',
        value: 1,
    },
    {
        label: 'Three Months',
        value: 3,
    },
    {
        label: 'Six Months',
        value: 6,
    },
    {
        label: 'One Year',
        value: 12,
    },
]

export const paymentPerMonth = process.env.REACT_APP_NET_TYPE == 'testnet' ? 0.01 : 39;