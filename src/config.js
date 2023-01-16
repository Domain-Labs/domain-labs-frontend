import ensImage from './assets/image/svgs/ens-logo.svg';
import binanceImage from './assets/image/svgs/binance-logo.svg';

export const ethereumChain = "5"
export const bscChain = "97";

/**
 * "5": ethereum chain
 * "97": bsc chain 
 *  */
export const contractAddresses = {
    "5": "0x377935c0C202f7f6C944176Cbc46e2EE23e4285F",
    "97": "0x55189eE743c50fBf357A2A49e24577Fdf8D22D54"
}

export const chainNames = {
    "5": "ethereum",
    "97": "bsc"
}

export const rpcUrls = {
    "5": "https://goerli.infura.io/v3/",
    "97": "https://data-seed-prebsc-1-s3.binance.org:8545"
}

export const domainSuffixes = {
    "5": "eth",
    "97": "bnb"
}

export const chainIdHexes = {
    "5": "0x5",
    "97": '0x61'
}

export const domainLogoImages = {
    "5": ensImage,
    "97": binanceImage
}

export const domainNames = {
    "5": "ENS",
    "97": "BNB"
}