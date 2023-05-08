export const SET_SEARCH_STRING = 'SET_SEARCH_STRING'
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST'

export const setSearchString = (payload) => ({
  type: SET_SEARCH_STRING,
  payload
})

export const setSearchList = (payload) => ({
  type: SET_SEARCH_LIST,
  payload
})
