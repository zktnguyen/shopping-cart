import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Well,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Image,
  MenuItem,
  Row,
  Col,
  InputGroup,
  DropdownButton
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { postBook, deleteBook } from '../../actions/books';
import api from '../../api';

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        description: '',
        price: 0
      },
      images: [],
      img: '',
      toDelete: -23
    };
    this.onImageSelect = this.onImageSelect.bind(this);
  }

  componentDidMount() {
    api.images
      .get()
      .then(images => {
        this.setState({ images });
      })
      .catch(() =>
        this.setState({
          images: 'error loading image files from the server',
          img: ''
        })
      );
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
    this.setState({ toDelete: e.target.value });
  };

  onSubmit = () => {
    this.props.postBook({
      title: this.state.data.title,
      description: this.state.data.description,
      price: this.state.data.price
    });
  };

  onImageSelect = img => {
    this.setState({ img: `/images/${img}` });
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

    const imgList = this.state.images.map(
      img => (
        <MenuItem
          key={img.name}
          value={img.name}
          eventKey={img.name} // eslint-disable-next-line
          onClick={this.onImageSelect.bind(this, img.name)}
        >
          {img.name}
        </MenuItem>
      ),
      this
    );
    // Image needs to be fixed, points to localhost:3000 (react server) instead of Localhost:3002 (express server)
    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-addon"
                  title="Select an Image"
                  bsStyle="primary"
                >
                  <MenuItem value="none">Select an Image</MenuItem>
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
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
          </Col>
        </Row>
      </Well>
    );
  }
}

BookForm.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
