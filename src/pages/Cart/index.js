import 'react-toastify/dist/ReactToastify.css';

import {
  confirmPurchase,
  getEstimatedAmount,
  purchaseDomains,
} from 'services/APIService';
import { useAccount, useSwitchNetwork, useWalletClient } from 'wagmi';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import CartItem from './Components/CartItem';
import CartTitle from './Components/CartTitle';
import Container from 'components/Container';
import CostViewer from './Components/CostViewer';
import { PublicKey } from '@solana/web3.js';
import SolCartItem from './Components/SolCartItem';
import { ethers } from 'ethers';
import { getProvider } from 'utils/SolUtils';
import { removeCart } from '../../redux/actions/cartActions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useTitle from 'hooks/useTitle';
import { useWallet } from '@solana/wallet-adapter-react';
import { web3 } from '@project-serum/anchor';

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { isConnected } = useAccount();
  const { connected } = useWallet();

  const { switchNetworkAsync } = useSwitchNetwork();
  const [results, setResults] = useState([]);
  const [price, setPrice] = useState(0);
  const [fee, setFee] = useState(0);
  const [priceInUsd, setPriceInUSD] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState('ETH');
  const dispatch = useDispatch();
  const { data: signer } = useWalletClient();
  const { address } = useAccount();
  const wallet = useWallet();
  const _removeCart = (_domainName, domain) => {
    dispatch(removeCart({ name: _domainName, type: domain }));
  };

  const timeSelect = (idx, year) => {
    const nResults = [...results];
    nResults[idx].duration = year;
    setResults(nResults);
  };

  const _purchaseDomains = async () => {
    if (paymentOption === 'ETH' || paymentOption === 'BNB') {
      if (!isConnected) {
        toast.error('Please connect your EVM wallet');
        return;
      }
      if (paymentOption === 'ETH') {
        await switchNetworkAsync(1);
      } else if (paymentOption === 'BNB') {
        await switchNetworkAsync(56);
      }

      const purchaseObj = await purchaseDomains(
        paymentOption,
        results,
        address,
        wallet.publicKey.toString(),
      );
      const tx = await signer.sendTransaction({
        to: purchaseObj.address,
        value: ethers.utils.parseUnits(
          (purchaseObj.price + purchaseObj.fee).toString(),
          'ether',
        ),
        gasLimit: ethers.utils.hexlify(10000),
        // gasPrice: ethers.utils.hexlify(parseInt(await signer.getGasPrice())),
      });
      await confirmPurchase(purchaseObj.purchaseId, tx);
      console.log(tx);
    } else if (!connected) {
      toast.error('Please connect your solana wallet');
      return;
    } else {
      let transaction = new web3.Transaction();
      const purchaseObj = await purchaseDomains(
        paymentOption,
        results,
        address,
        wallet.publicKey.toString(),
      );
      // Add an instruction to execute
      transaction.add(
        web3.SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(purchaseObj.address),
          lamports: Math.ceil(
            Number(purchaseObj.price + purchaseObj.fee) * web3.LAMPORTS_PER_SOL,
          ),
        }),
      );
      const solProvider = getProvider(wallet);
      const latestBlockHash = await solProvider.connection.getLatestBlockhash(
        'finalized',
      );
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = latestBlockHash.blockhash;
      const transaction1 = await solProvider.wallet.signTransaction(
        transaction,
      );
      // tx.recentBlockhash = latestBlockHash.blockhash;
      // tx.feePayer = provider?.wallet.publicKey;
      // let signed = await provider?.wallet.signTransaction(tx);

      await solProvider.connection.confirmTransaction({
        signature: transaction1.signature,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });
      await confirmPurchase(purchaseObj.purchaseId, transaction1.signature);
      // try {
      //   const tx = await web3.sendAndConfirmTransaction(
      //     solProvider.connection,
      //     transaction,
      //     [],
      //   );
      //   await confirmPurchase(purchaseObj.purchaseId, tx);
      // } catch (err) {
      //   console.log(err, 'err');
      // }
    }
  };

  useEffect(() => {
    const domains = cart.map((item) => {
      return {
        name: item.name,
        type: item.type,
        duration: 1,
      };
    });
    setResults(domains);
  }, [cart]);

  useEffect(() => {
    setLoading(true);
    getEstimatedAmount(paymentOption, results)
      .then((rlt) => {
        setPrice(rlt.price);
        setPriceInUSD(rlt.tokenPriceInUSD);
        setFee(rlt.fee);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [paymentOption, results]);

  useTitle('Domain Labs - Cart');

  return (
    <Container>
      <Box
        pt={10}
        px={{ xs: '30px', sm: '40px' }}
        display={{
          md: 'flex',
          xs: 'block',
        }}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box>
          <CartTitle />
          <Box
            sx={{
              marginTop: '40px',
            }}
          >
            <Box
              my={'40px'}
              sx={{
                width: '100%',
                gridTemplateColumns: {
                  lg: 'repeat(4, 1fr)',
                  md: 'repeat(3, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  xs: 'repeat(1, 1fr)',
                },
              }}
              gap={'20px'}
              display="grid"
            >
              {results.length > 0 &&
                results.map((item, idx) => {
                  console.log(item, 'items');
                  if (item.type !== 'SOL') {
                    return (
                      <CartItem
                        key={idx}
                        idx={idx}
                        _removeCart={_removeCart}
                        name={item.name}
                        domain={item.type}
                        timeSelect={timeSelect}
                        results={results}
                      />
                    );
                  } else {
                    return (
                      <SolCartItem
                        key={idx}
                        _removeCart={_removeCart}
                        name={item.name}
                        domain={item.type}
                      />
                    );
                  }
                })}
            </Box>
          </Box>
        </Box>
        <CostViewer
          price={price}
          priceInUsd={priceInUsd}
          gasPrice={fee}
          cart={cart}
          setPaymentOption={setPaymentOption}
          paymentOption={paymentOption}
          loading={loading}
          purchaseDomain={_purchaseDomains}
        />
      </Box>
    </Container>
  );
};

export default Cart;
