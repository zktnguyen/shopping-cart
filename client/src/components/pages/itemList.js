import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Grid, Carousel } from 'react-bootstrap';

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
          image={book.image}
          price={book.price}
        />
      </Col>
    ));
    return (
      <Grid>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img
                width={900}
                height={500}
                alt="900x500"
                src="/carousel/unsplash1.jpg"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                width={900}
                height={500}
                alt="900x500"
                src="/carousel/unsplash2.jpg"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Cart />
        </Row>
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
      image: PropTypes.string.isRequired
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
