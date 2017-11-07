import api from '../api';

// Constants needed for action types
const GET_BOOKS = 'GET_BOOKS';
const POST_BOOK = 'POST_BOOK';
const DELETE_BOOK = 'DELETE_BOOK';
const UPDATE_BOOK = 'UPDATE_BOOK';

export const getBooks = () => dispatch =>
  api.books.getAll().then(books => {
    const action = {
      type: GET_BOOKS,
      payload: books
    };
    dispatch(action);
  });

export const postBook = book => dispatch =>
  api.books.post(book).then(postedBook => {
    const action = {
      type: POST_BOOK,
      payload: postedBook
    };
    dispatch(action);
  });

export const deleteBook = _id => dispatch =>
  api.books.delete(_id).then(() => {
    const action = {
      type: DELETE_BOOK,
      payload: { _id }
    };
    dispatch(action);
  });

export const updateBook = book => ({
  type: UPDATE_BOOK,
  payload: book
});

export const actionTypes = {
  GET_BOOKS,
  POST_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK
};
