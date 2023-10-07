import axiosInstance from 'utils/axios';

export const checkDomainAvailability = async (names) => {
  try {
    const rlt = await axiosInstance.post('/domains/check-available', {
      names,
    });
    return rlt.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getEstimatedAmount = async (paymentOption, domains) => {
  try {
    const rlt = await axiosInstance.post('/domains/getEstimatedAmount', {
      paymentOption,
      domains,
    });
    return rlt.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const purchaseDomains = async (
  paymentOption,
  domains,
  address,
  solAddress,
) => {
  try {
    const rlt = await axiosInstance.post('/domains/purchase', {
      paymentOption,
      domains,
      address,
      solAddress,
    });
    return rlt.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const confirmPurchase = async (paymentId, transaction) => {
  // confirmPurchase
  try {
    const rlt = await axiosInstance.post('/domains/confirmPurchase', {
      id: paymentId,
      transaction,
    });
    return rlt.data;
  } catch (err) {
    console.log(err);
    return false;
  }
};
