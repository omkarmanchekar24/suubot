import {ADD_ITEMS_TO_CART, RESET_CART} from './types';

export const addItemsToCart = (items) => {
  return {
    type: ADD_ITEMS_TO_CART,
    payload: items,
  };
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};
