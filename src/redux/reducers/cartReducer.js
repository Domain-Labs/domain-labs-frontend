import {
  ADD_CART,
  BUY_DOMAIN,
  BUY_DOMAIN_FAILED,
  BUY_DOMAIN_SUCCESS,
  REMOVE_ALL,
  REMOVE_CART,
  REQUEST_DOMAIN,
  REQUEST_DOMAIN_FAIL,
  REQUEST_DOMAIN_SUCCESS,
  SET_STEP,
} from '../actions/cartActions';

const initialState = {
  cart: [],
  step: 0, //0: buy domain, 1: waiting for 60s, 2: register domain
  waiting: null,
  loading: false,
  buyItems: [],
};

const cartReducer = (state = initialState, action) => {
  let exist;
  switch (action.type) {
    case ADD_CART:
      exist = state.cart.findIndex((item) => {
        return (
          item.name === action.payload.name && item.type === action.payload.type
        );
      });
      if (exist < 0) {
        const nCart = [...state.cart, { ...action.payload }];
        return {
          ...state,
          cart: nCart,
        };
      } else {
        return {
          ...state,
        };
      }
    case REMOVE_CART:
      exist = state.cart.findIndex((item) => {
        return (
          item.name === action.payload.name && item.type === action.payload.type
        );
      });
      console.log(exist, action.payload, 'item');
      if (exist < 0) {
        return {
          ...state,
        };
      } else {
        const nCart = [...state.cart];
        nCart.splice(exist, 1);
        return {
          ...state,
          cart: nCart,
        };
      }
    case REMOVE_ALL:
      const filtered = state.cart.filter(
        (item) => item.type !== action.payload.type,
      );
      return {
        ...state,
        cart: [], // filtered
      };
    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case REQUEST_DOMAIN:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_DOMAIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_DOMAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        waiting: Date.now(),
        step: 1,
      };
    case BUY_DOMAIN:
      return {
        ...state,
        loading: true,
        buyItems: action.payload,
      };
    case BUY_DOMAIN_SUCCESS:
      return {
        ...state,
        loading: false,
        buyItems: [],
        step: 0,
      };
    case BUY_DOMAIN_FAILED:
      return {
        ...state,
        loading: false,
        buyItems: [],
        step: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
