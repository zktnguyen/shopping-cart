import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addToCart, updateCartItem } from '../../actions/cart';

class BookItem extends Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
  }

  handleCart = () => {
    const book = {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      price: this.props.price,
      quantity: 1
    };

    const cartIndex = this.props.cart.findIndex(cart => cart._id === book._id);
    if (cartIndex === -1) {
      this.props.addToCart(book);
    } else {
      this.props.updateCartItem(book._id, 1);
    }
  };

  render() {
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <h6>{this.props.title}</h6>
            <p>{this.props.description}</p>
            <h6>usd. {this.props.price}</h6>
            <Button bsStyle="primary">Buy Now</Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

BookItem.propTypes = {
  _id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addToCart, updateCartItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
