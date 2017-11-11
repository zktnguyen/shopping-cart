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

import {
  postBook,
  deleteBook,
  getBooks,
  resetButton
} from '../../actions/books';
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
    if (this.props.books.length === 0) {
      this.props.getBooks();
    }
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
    const imageString = this.textInput.props.value;
    this.props.postBook({
      title: this.state.data.title,
      description: this.state.data.description,
      image: imageString,
      price: this.state.data.price
    });
  };

  onImageSelect = img => {
    this.setState({ img: `/images/${img}` });
  };

  deleteBook = () => {
    this.props.deleteBook(this.state.toDelete);
  };

  resetForm = () => {
    // reset the fields
    // dispatch action to reset the submit button
    this.props.resetButton();
    this.setState({ data: { title: '', description: '', price: 0 }, img: '' });
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
    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl
                  type="text"
                  ref={input => {
                    this.textInput = input;
                  }}
                  value={this.state.img}
                />
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
              <FormGroup
                controlId="title"
                validationState={this.props.validation}
              >
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={data.title}
                  onChange={this.onChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="description"
                validationState={this.props.validation}
              >
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={data.description}
                  onChange={this.onChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="price"
                validationState={this.props.validation}
              >
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={data.price}
                  onChange={this.onChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <Button
                onClick={!this.props.msg ? this.onSubmit : this.resetForm}
                bsStyle={!this.props.style ? 'primary' : this.props.style}
              >
                {!this.props.msg ? 'Save book' : this.props.msg}
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
BookForm.defaultProps = {
  msg: null,
  style: null,
  validation: null
};

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
  deleteBook: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
  msg: PropTypes.string,
  style: PropTypes.string,
  resetButton: PropTypes.func.isRequired,
  validation: PropTypes.string
};

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { postBook, deleteBook, getBooks, resetButton },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
