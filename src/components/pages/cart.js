import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel, Row, Col, Modal, Button } from 'react-bootstrap';
import CartItem from './cartItem';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close = () => this.setState({ showModal: false });
  open = () => this.setState({ showModal: true });

  renderEmpty = () => <h1>Empty Cart</h1>;

  renderCart = () => {
    const cartItemsList = this.props.cart.map(cartItem => (
      <CartItem
        key={cartItem._id}
        title={cartItem.title}
        price={cartItem.price}
        quantity={cartItem.quantity}
        _id={cartItem._id}
      />
    ));
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6>Total Amount: {this.props.total} </h6>
            <Button bsStyle="success" onClick={this.open}>
              Proceed to Checkout
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>total $: {this.props.total}</h6>
            </Col>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    );
  };

  render() {
    return !!this.props.cart[0] ? this.renderCart() : this.renderEmpty();
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  total: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    total: state.cart.total
  };
}

export default connect(mapStateToProps)(Cart);
