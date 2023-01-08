import ensImage from './assets/image/svgs/ens-logo.svg';
import binanceImage from './assets/image/svgs/binance-logo.svg';

export const ethereumChain = "5"
export const bscChain = "97";

/**
 * "5": ethereum chain
 * "97": bsc chain 
 *  */
export const contractAddresses = {
    "5": "0x4f11832Fac8A0E0C11cd8FC33B2F43CfED3388eC",
    "97": "0x15393Ea572fFE1b8DB3B80f353d99F87cefBF807"
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