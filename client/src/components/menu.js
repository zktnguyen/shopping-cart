import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Menu = ({ cartCapacity }) => (
  <Navbar>
    <Navbar.Header>
      <LinkContainer to="/">
        <Navbar.Brand>Shopping Cart</Navbar.Brand>
      </LinkContainer>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/about">
        <NavItem eventKey={1}>About</NavItem>
      </LinkContainer>
      <LinkContainer to="/contact">
        <NavItem eventKey={2}>Contact</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/admin">
        <NavItem eventKey={1}>Admin</NavItem>
      </LinkContainer>
      <LinkContainer to="/cart">
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
