/**
 * We purposely added 2 reducers for the example of combineReducers method.
 * There can be only 1 or even more than 2 reducers.
 * combineReducers defines the structure of the store object.
 */

import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import domainReducer from './domainReducer';
import profileReducer from './profileReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  domain: domainReducer,
  profile: profileReducer,
});
