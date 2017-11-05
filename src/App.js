import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import {
  getBooks,
  postBook,
  deleteBook,
  updateBook
} from './components/actions/books';
import {
  addToCart,
  deleteCartItem,
  updateCartItem
} from './components/actions/cart';

class App extends Component {
  componentDidMount() {
    this.props.getBooks();
    this.props.postBook({
      _id: 4,
      title: 'Trust me',
      description: 'underscores',
      price: 32
    });
    this.props.deleteBook(2);
    this.props.updateBook({ _id: 4, title: 'React in 24 hrs' });
    this.props.addToCart({
      _id: 4,
      title: 'Trust me',
      description: 'underscores',
      price: 32,
      quantity: 1
    });
    this.props.addToCart({
      _id: 1,
      title: 'this is the book title',
      description: 'this is the book description',
      price: 33.33,
      quantity: 1
    });
    this.props.deleteCartItem({ _id: 4 });
    this.props.updateCartItem(4, 1);
    this.props.updateCartItem(1, -1);
  }

  render() {
    return (
      <div>
        <h1> Welcome to Redux! </h1>
      </div>
    );
  }
}

App.propTypes = {
  getBooks: PropTypes.func.isRequired,
  postBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  updateCartItem: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getBooks,
      postBook,
      deleteBook,
      updateBook,
      addToCart,
      deleteCartItem,
      updateCartItem
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(App);
