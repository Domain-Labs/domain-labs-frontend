export const ADD_CART = 'ADD_CART'
export const REMOVE_CART = 'REMOVE_CART'
export const REMOVE_ALL = 'REMOVE_ALL'

export const addCart = (payload) => ({
  type: ADD_CART,
  payload
})

export const removeCart = (payload) => ({
  type: REMOVE_CART,
  payload
})

export const removeAll = (payload) => ({
  type: REMOVE_ALL,
  payload
})
