import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Menu = ({ cartCapacity }) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/shopping-cart">Shopping Cart</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href="/shopping-cart">
        About
      </NavItem>
      <NavItem eventKey={2} href="/shopping-cart">
        Contact
      </NavItem>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/shopping-cart/admin">
        <NavItem eventKey={1}>Admin</NavItem>
      </LinkContainer>
      <LinkContainer to="/shopping-cart/cart">
        <NavItem eventKey={2}>
          Cart{' '}
          {cartCapacity > 0 ? (
            <Badge className="badge">{cartCapacity}</Badge>
          ) : (
            ''
          )}
        </NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

Menu.propTypes = {
  cartCapacity: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    cartCapacity: state.cart.quantity
  };
}

export default connect(mapStateToProps)(Menu);
