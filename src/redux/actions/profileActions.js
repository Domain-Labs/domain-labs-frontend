import axios from 'axios';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_FAIL = 'FETCH_DATA_FAIL';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export const getDomainsByAddress = (address) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_DATA,
    });
    try {
      const rlts = await axios.post(
        'https://8y42uy24vl.execute-api.us-east-1.amazonaws.com/getNamesByAddr',
        {
          address: String(address).toLocaleLowerCase(),
        },
      );
      const domains = rlts.data.data.domains.list;
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: domains,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_DATA_FAIL,
      });
    }
  };
};
