import axios from 'axios';

export const getTransactionReceiptMined = (web3Interface, txHash, interval) => {
  const transactionReceiptAsync = function (resolve, reject) {
    web3Interface.eth.getTransactionReceipt(txHash, (error, receipt) => {
      if (error) {
        reject(error);
      } else if (receipt == null) {
        console.log('restart ...');
        setTimeout(
          () => transactionReceiptAsync(resolve, reject),
          interval ? interval : 500,
        );
      } else {
        console.log(receipt, 'finished ...');
        resolve(receipt);
      }
    });
  };
  return new Promise(transactionReceiptAsync);
};

export const getPriceInUSD = async (domin) => {
  const res = await axios.get(
    `https://8y42uy24vl.execute-api.us-east-1.amazonaws.com/getUSDPrice/${domin}`,
    {},
  );
  return res.data.price;
  // return 307;
};

export const getNames = async (address) => {
  const res = await axios.post(
    'https://8y42uy24vl.execute-api.us-east-1.amazonaws.com/getNamesByAddr',
    {
      address,
    },
  );
  const domains = res.data.domains.list;
  console.log(domains, 'names against address');
  return domains;
};
