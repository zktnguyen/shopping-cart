// Import all of the constants necessary
import { actionTypes } from '../actions/books';

export default function(
  state = {
    books: []
  },
  action
) {
  let currentBooks = [];
  let index = -1;
  let newBook = {};
  switch (action.type) {
    case actionTypes.GET_BOOKS:
      return { ...state, books: [...action.payload] };
    case actionTypes.POST_BOOK:
      return { books: [...state.books, action.payload] };
    case actionTypes.DELETE_BOOK:
      currentBooks = [...state.books];
      index = currentBooks.findIndex(book => book._id === action.payload._id);

      return {
        books: [
          ...currentBooks.slice(0, index),
          ...currentBooks.slice(index + 1)
        ]
      };
    case actionTypes.UPDATE_BOOK:
      currentBooks = [...state.books];
      index = currentBooks.findIndex(book => book._id === action.payload._id);
      if (index >= 0) {
        newBook = { ...currentBooks[index], title: action.payload.title };
        return {
          books: [
            ...currentBooks.slice(0, index),
            newBook,
            ...currentBooks.slice(index + 1)
          ]
        };
      }
      return { books: currentBooks };
    default:
      return state;
  }
}
