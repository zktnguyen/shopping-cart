// Import all of the constants necessary
import { actionTypes } from '../actions/books';

export default function(
  state = {
    books: [
      {
        _id: 1,
        title: 'this is the book title',
        description: 'this is the book description',
        price: 33.33
      },
      {
        _id: 2,
        title: 'this is the second book title',
        description: 'this is the second book description',
        price: 55
      }
    ]
  },
  action
) {
  let currentBooks = [];
  let index = -1;
  let newBook = {};
  switch (action.type) {
    case actionTypes.GET_BOOKS:
      return state;
    case actionTypes.POST_BOOK:
      currentBooks = [...state.books];
      index = currentBooks.findIndex(book => book._id === action.payload._id);

      return [
        ...currentBooks.slice(0, index),
        ...currentBooks.slice(index + 1)
      ];
    case actionTypes.UPDATE_BOOK:
      currentBooks = [...state.books];
      index = currentBooks.findIndex(book => book._id === action.payload._id);

      newBook = { ...currentBooks[index], title: action.payload.title };
      return [
        ...currentBooks.slice(0, index),
        newBook,
        ...currentBooks.slice(index + 1)
      ];
    default:
      return state;
  }
}
