import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Panel, Row, Col, Label, ButtonGroup, Button } from 'react-bootstrap';

import { deleteCartItem, updateCartItem } from '../../actions/cart';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
  }

  onDelete = () => {
    const _id = this.props._id;
    this.props.deleteCartItem({ _id });
  };

  onIncrement = () =>
    this.props.updateCartItem(this.props._id, 1, this.props.cart);
  onDecrement = () =>
    this.props.updateCartItem(this.props._id, -1, this.props.cart);

  render() {
    const { _id, title, price, quantity } = this.props;
    return (
      <Panel key={_id}>
        <Row>
          <Col xs={12} sm={4}>
            <h6>{title}</h6>
          </Col>
          <Col xs={12} sm={2}>
            <h6>usd. ${price}</h6>
          </Col>
          <Col xs={12} sm={2}>
            <h6>
              qty. <Label bsStyle="success">{quantity}</Label>
            </h6>
          </Col>
          <Col xs={6} sm={4}>
            <ButtonGroup style={{ minWidth: '300px' }}>
              <Button
                bsStyle="default"
                onClick={this.onDecrement}
                bsSize="small"
              >
                -
              </Button>
              <Button
                bsStyle="default"
                onClick={this.onIncrement}
                bsSize="small"
              >
                +
              </Button>
              <Button bsStyle="danger" onClick={this.onDelete} bsSize="small">
                Delete
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Panel>
    );
  }
}

CartItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
  updateCartItem: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteCartItem, updateCartItem }, dispatch);
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
