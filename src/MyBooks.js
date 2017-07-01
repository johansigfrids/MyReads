import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Bookshelf from './Bookshelf';

class MyBooks extends Component {
  render() {
    const {currentlyReading, wantToRead, read, moveBook} = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf books={currentlyReading} title='Currently Reading' moveBook={moveBook} />
            <Bookshelf books={wantToRead} title='Want to Read' moveBook={moveBook} />
            <Bookshelf books={read} title='Read' moveBook={moveBook} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyBooks;