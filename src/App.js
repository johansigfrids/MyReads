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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyBooks 
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
          />
        )} />
        <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp;
