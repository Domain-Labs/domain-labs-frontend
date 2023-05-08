import { ADD_CART, REMOVE_ALL, REMOVE_CART } from "../actions/cartActions";

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  let exist;
  switch (action.type) {
    case ADD_CART:
      exist = state.cart.findIndex((item) => {
        return item.name === action.payload.name && item.domain === action.payload.domain;
      });
      if (exist < 0) {
        const nCart = [...state.cart, {...action.payload}];
        return {
          cart: nCart,
        };
      } else {
        return {
          ...state,
        };
      }
    case REMOVE_CART:
      exist = state.cart.findIndex((item) => {
        return item.name === action.payload.name && item.domain === action.payload.domain;
      });
      console.log(exist, action.payload,"item");
      if (exist < 0) {
        return {
          ...state,
        };
      } else {
        const nCart = [...state.cart];
        nCart.splice(exist, 1)
        return {
          cart: nCart,
        };
      }
    case REMOVE_ALL:
      const filtered = state.cart.filter((item) => item.domain !== action.payload.domain);
      return {
        cart: filtered
      }
    default:
      return state;
  }
};

export default cartReducer;
