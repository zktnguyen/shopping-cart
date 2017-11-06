import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import './App.css';
import ItemsList from './components/pages/itemList';
import BookForm from './components/pages/bookForm';
import Cart from './components/pages/cart';
import Menu from './components/menu';
import Footer from './components/footer';

const App = ({ location }) => (
  <div>
    <Menu />
    <div className="container">
      <Route location={location} exact path="/" component={ItemsList} />
      <Route location={location} exact path="/admin" component={BookForm} />
      <Route location={location} exact path="/cart" component={Cart} />
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
