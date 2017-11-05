import { actionTypes } from '../actions/cart';

export default function(state = { cart: [], total: 0, qty: 0 }, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return { cart: [...state, ...action.payload] };
    case actionTypes.DELETE_CART_ITEM:
      return { cart: [...state, ...action.payload] };
    case actionTypes.UPDATE_CART:
      return { ...state };
    default:
      return state;
  }
}
