// Constants needed for action types
const GET_BOOKS = 'GET_BOOKS';
const POST_BOOK = 'POST_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';

export const getBooks = () => ({
  type: GET_BOOKS
});

export const postBook = book => ({
  type: POST_BOOK,
  payload: book
});

export const deleteBook = _id => ({
  type: DELETE_BOOK,
  payload: { _id }
});

export const updateBook = book => ({
  type: UPDATE_BOOK,
  payload: book
});

export const actionsType = {
  GET_BOOKS,
  POST_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK
};
