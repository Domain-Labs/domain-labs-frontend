import * as BNS from '../../utils/BNBDomain';
import * as ENS from '../../utils/ENSDomain';

export const ADD_CART = 'ADD_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const REMOVE_ALL = 'REMOVE_ALL';
export const SET_STEP = 'SET_STEP';

export const REQUEST_DOMAIN = 'REQUEST_DOMAIN';
export const REQUEST_DOMAIN_SUCCESS = 'REQUEST_DOMAIN_SUCCESS';
export const REQUEST_DOMAIN_FAIL = 'REQUEST_DOMAIN_FAIL';

export const BUY_DOMAIN = 'BUY_DOMAIN';
export const BUY_DOMAIN_SUCCESS = 'BUY_DOMAIN_SUCCESS';
export const BUY_DOMAIN_FAILED = 'BUY_DOMAIN_FAILED';

export const addCart = (payload) => ({
  type: ADD_CART,
  payload,
});

export const removeCart = (payload) => ({
  type: REMOVE_CART,
  payload,
});

export const removeAll = (payload) => ({
  type: REMOVE_ALL,
  payload,
});

export const setStep = (payload) => ({
  type: SET_STEP,
  payload,
});

export const buyDomains = (data) => {
  return async (dispatch) => {
    const { network, results, provider, signer } = data;
    dispatch({
      type: BUY_DOMAIN,
    });
    if (network === 'BNS') {
      try {
        const rlt = await BNS.register(results, provider, signer);
        console.log(rlt, 'rlt');
        if (rlt) {
          dispatch({
            type: BUY_DOMAIN_SUCCESS,
            payload: {
              items: results,
              network: 'BNS',
            },
          });
        } else {
          dispatch({
            type: BUY_DOMAIN_FAILED,
          });
        }
      } catch (error) {
        dispatch({
          type: BUY_DOMAIN_FAILED,
        });
      }
    } else if (network === 'ENS') {
      try {
        const rlt = await ENS.register(results, provider, signer);
        if (rlt) {
          dispatch({
            type: BUY_DOMAIN_SUCCESS,
            payload: {
              cart: results,
              network: 'ENS',
            },
          });
        } else {
          dispatch({
            type: BUY_DOMAIN_FAILED,
          });
        }
      } catch (error) {
        dispatch({
          type: BUY_DOMAIN_FAILED,
        });
      }
    }
  };
};

export const requestDomain = (data) => {
  return async (dispatch) => {
    const { network, results, provider, signer } = data;
    dispatch({
      type: REQUEST_DOMAIN,
    });
    if (network === 'BNS') {
      try {
        const rlt = await BNS.commits(results, provider, signer);
        console.log(rlt, 'rlt');
        if (rlt) {
          dispatch({
            type: REQUEST_DOMAIN_SUCCESS,
          });
        } else {
          dispatch({
            type: REQUEST_DOMAIN_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_DOMAIN_FAIL,
        });
      }
    } else if (network === 'ENS') {
      try {
        const rlt = await ENS.commits(results, provider, signer);
        console.log(rlt, 'rlt');
        if (rlt) {
          dispatch({
            type: REQUEST_DOMAIN_SUCCESS,
          });
        } else {
          dispatch({
            type: REQUEST_DOMAIN_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: REQUEST_DOMAIN_FAIL,
        });
      }
    }
  };
};
