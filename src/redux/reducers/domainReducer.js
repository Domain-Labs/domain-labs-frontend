import { SET_SEARCH_LIST, SET_SEARCH_STRING } from '../actions/domainActions';

const initialState = {
  searchString: '',
  searchList: [],
  isSingleSearch: true,
};

const domainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload,
        isSingleSearch: true,
      };
    case SET_SEARCH_LIST:
      return {
        ...state,
        searchList: action.payload,
        isSingleSearch: false,
      };
    default:
      return state;
  }
};

export default domainReducer;
