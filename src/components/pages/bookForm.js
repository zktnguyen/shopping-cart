import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Well,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { postBook, deleteBook } from '../../actions/books';

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: -1,
        title: '',
        description: '',
        price: 0
      },
      currentId: this.props.books[this.props.books.length - 1]._id + 1,
      toDelete: -23
    };
  }

  onChange = e => {
    let value = '';
    if (e.target.name === 'price') value = parseInt(e.target.value, 10);
    else value = e.target.value;

    this.setState({
      data: { ...this.state.data, [e.target.name]: value }
    });
  };

  onSelect = e => {
    this.setState({ toDelete: parseInt(e.target.value, 10) });
  };

  onSubmit = () => {
    this.props.postBook({
      _id: this.state.currentId,
      title: this.state.data.title,
      description: this.state.data.description,
      price: this.state.data.price
    });
    this.setState({ currentId: this.state.currentId + 1 });
  };

  deleteBook = () => {
    this.props.deleteBook(this.state.toDelete);
  };

  render() {
    const { data, toDelete } = this.state;
    const booksList = this.props.books.map(book => (
      <option key={book._id} value={book._id}>
        {book.title}
      </option>
    ));
    return (
      <Well>
        <Panel>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              name="title"
              placeholder="Enter title"
              value={data.title}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              name="description"
              placeholder="Enter Description"
              value={data.description}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup controlId="price">
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="number"
              name="price"
              placeholder="Enter price"
              value={data.price}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button onClick={this.onSubmit} bsStyle="primary">
            Save Book
          </Button>
        </Panel>
        <Panel style={{ marginTop: '25px' }}>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select a book to delete</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={toDelete}
              onChange={this.onSelect}
            >
              <option value="select">select</option>
              {booksList}
            </FormControl>
          </FormGroup>
          <Button onClick={this.deleteBook} bsStyle="danger">
            Delete book
          </Button>
        </Panel>
      </Well>
    );
  }
}

BookForm.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  postBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    books: state.books.books
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postBook, deleteBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
