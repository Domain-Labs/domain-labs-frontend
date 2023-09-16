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
