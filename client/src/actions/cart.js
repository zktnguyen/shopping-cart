const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const UPDATE_CART = 'UPDATE_CART_ITEM';

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: item
});

export const deleteCartItem = item => ({
  type: DELETE_CART_ITEM,
  payload: item
});

export const updateCartItem = (_id, unit) => ({
  type: UPDATE_CART,
  payload: { _id, unit }
});

export const actionTypes = {
  ADD_TO_CART,
  DELETE_CART_ITEM,
  UPDATE_CART
};
