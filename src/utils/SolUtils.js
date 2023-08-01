import { Connection, clusterApiUrl } from '@solana/web3.js';

import { AnchorProvider } from '@project-serum/anchor';
import { BASE_API_URL } from '../config';
import axios from 'axios';

// import { Provider } from '@project-serum/anchor';

// import Provider from '@project-serum/anchor';

const opts = {
  preflightCommitment: 'processed',
};

export const getProvider = (wallet) => {
  const connection = new Connection(
    // clusterApiUrl('mainnet-beta'),
    clusterApiUrl('devnet'),
    // 'https://red-bitter-brook.solana-mainnet.discover.quiknode.pro/6ef6b38be9eb778256aafcd3e4907da03585b0d2/',
    opts.preflightCommitment,
  );

  const provider = new AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment,
  );
  return provider;
};

export const checkAvailability = async (domains) => {
  const res = await axios.post(`${BASE_API_URL}/check-available`, {
    domains,
  });
  return res.data;
};
