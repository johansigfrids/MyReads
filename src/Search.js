import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends Component {
  state = {
    searchResults: []
  }

  search = (e) => {
    const query = e.target.value;
    BooksAPI.search(query, 20).then(searchResults => {
      if (searchResults.error) {
        searchResults = [];
      }
      this.setState({searchResults});
    });
  }

  addBook = (book, shelf) => {
    this.props.moveBook(book, shelf);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.search}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults && this.state.searchResults.map(book => (
              <li key={book.id}>
                <Book book={book} moveBook={this.addBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;