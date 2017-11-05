import { actionTypes } from '../actions/cart';

const updateState = (currentTotal, currentQuantity, price, quantity) => ({
  total: currentTotal + price,
  quantity: currentQuantity + quantity
});

export default function(state = { cart: [], total: 0, quantity: 0 }, action) {
  let update = {};
  let currentCart = [];
  let index = -1;
  let updatedItem = {};
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      update = updateState(
        state.total,
        state.quantity,
        action.payload.price,
        1
      );
      return {
        cart: [...state.cart, action.payload],
        total: update.total,
        quantity: update.quantity
      };
    case actionTypes.DELETE_CART_ITEM:
      currentCart = [...state.cart];
      index = currentCart.findIndex(item => item._id === action.payload._id);
      if (index >= 0) {
        update = updateState(
          state.total,
          state.quantity,
          currentCart[index].price * -1,
          currentCart[index].quantity * -1
        );
        return {
          cart: [
            ...currentCart.slice(0, index),
            ...currentCart.slice(index + 1)
          ],
          total: update.total,
          quantity: update.quantity
        };
      }
      return {
        cart: currentCart,
        total: state.total,
        quantity: state.quantity
      };
    case actionTypes.UPDATE_CART:
      currentCart = [...state.cart];
      index = currentCart.findIndex(item => item._id === action.payload._id);
      if (index >= 0) {
        update = updateState(
          state.total,
          state.quantity,
          currentCart[index].price * action.payload.unit,
          action.payload.unit
        );
        updatedItem = {
          ...currentCart[index],
          quantity: currentCart[index].quantity + action.payload.unit
        };
        if (updatedItem.quantity > 0) {
          return {
            cart: [
              ...currentCart.slice(0, index),
              updatedItem,
              ...currentCart.slice(index + 1)
            ],
            total: update.total,
            quantity: update.quantity
          };
        }
        return {
          cart: [
            ...currentCart.slice(0, index),
            ...currentCart.slice(index + 1)
          ],
          total: update.total,
          quantity: update.quantity
        };
      }
      return {
        cart: currentCart,
        total: state.total,
        quantity: state.quantity
      };
    default:
      return state;
  }
}
