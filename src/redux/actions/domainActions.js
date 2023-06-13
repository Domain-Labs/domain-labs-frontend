export const SET_SEARCH_STRING = 'SET_SEARCH_STRING';
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
export const SET_SEARACH_LIST_CLIO = 'SET_SEARACH_LIST_CLIO';

export const setSearchString = (payload) => ({
  type: SET_SEARCH_STRING,
  payload,
});

export const setSearchList = (payload) => ({
  type: SET_SEARCH_LIST,
  payload,
});

export const setSearchListClio = (payload) => ({
  type: SET_SEARACH_LIST_CLIO,
  payload,
});
