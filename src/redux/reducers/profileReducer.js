import {
  FETCH_DATA,
  FETCH_DATA_FAIL,
  FETCH_DATA_SUCCESS,
} from '../actions/profileActions';

const initialState = {
  domains: [],
  loading: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        domains: action.payload,
      };
    case FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
