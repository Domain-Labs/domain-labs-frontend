import { BigNumber } from 'ethers';
import Web3 from 'web3';
import { getClioContract } from './Contracts';
import { getTransactionReceiptMined } from './EtherUtils';

const clioContractAddress = '0x5d79F2f9b10432B87094653df59Bdc0D1423F13a'; // contract address BSC Testnet

export const getPrice = async (isYearly, provider) => {
  const clio = getClioContract({ address: clioContractAddress, provider });
  const price = await clio['getPrice(bool)'](isYearly);
  return price;
};

export const subscribe = async (isYearly, provider, signer) => {
  const clio = getClioContract({ address: clioContractAddress, provider });
  const permanantClio = clio.connect(signer);
  // const price = '0.0001'; // 0.0021 ETH
  const web3 = new Web3(provider.connection.url);
  // const priceInWei = web3.utils.toWei(price);
  try {
    const price = await getPrice(isYearly, provider);
    console.log(price);
    const clioRlt = await permanantClio['subscribe(bool)'](isYearly, {
      value: BigNumber.from(price)
        .mul(BigNumber.from(105))
        .div(BigNumber.from(100)),
      gasLimit: 300000,
    });
    const receipt = await getTransactionReceiptMined(web3, clioRlt.hash);
    console.log(receipt, 'receipt');
    if (receipt.status) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
