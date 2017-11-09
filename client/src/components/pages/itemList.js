import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Grid } from 'react-bootstrap';

import { getBooks } from '../../actions/books';
import BookItem from './bookItem';
import Cart from './cart';

class itemList extends Component {
  componentDidMount() {
    if (this.props.books.length === 0) {
      this.props.getBooks();
    }
  }

  render() {
    const itemsList = this.props.books.map(book => (
      <Col xs={12} sm={6} md={4} key={book._id}>
        <BookItem
          _id={book._id}
          title={book.title}
          description={book.description}
          images={book.images}
          price={book.price}
        />
      </Col>
    ));
    return (
      <Grid>
        <h1> List of Items </h1>
        <Cart />
        <Row style={{ marginTop: '25px' }}>{itemsList}</Row>
      </Grid>
    );
  }
}

itemList.propTypes = {
  getBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired
      ).isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(itemList);
