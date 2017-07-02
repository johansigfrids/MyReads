import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import {Route} from 'react-router-dom';
import MyBooks from './MyBooks';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const currentlyReading = books.filter(b => b.shelf === 'currentlyReading');
      const wantToRead = books.filter(b => b.shelf === 'wantToRead');
      const read = books.filter(b => b.shelf === 'read');
      this.setState({ currentlyReading, wantToRead, read});
    });
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);

    this.setState(state => {
      book.shelf = shelf;

      const currentlyReading = state.currentlyReading.filter(b => b.id !== book.id);
      const wantToRead = state.wantToRead.filter(b => b.id !== book.id);
      const read = state.read.filter(b => b.id !== book.id);

      switch (shelf) {
        case 'currentlyReading':
          currentlyReading.push(book);
          break;
        case 'wantToRead':
          wantToRead.push(book);
          break;
        case 'read':
          read.push(book);
          break;
        default: 
          break;
      }

      return { currentlyReading, wantToRead, read};
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyBooks 
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            moveBook={this.moveBook}
          />
        )} />
        <Route path="/search" render={({history}) =>(
          <Search moveBook={this.moveBook} history={history}/>
        )} />
      </div>
    )
  }
}

export default BooksApp;
