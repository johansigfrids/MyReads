import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route} from 'react-router-dom';
import MyBooks from './MyBooks';
import Search from './Search';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={MyBooks} />
        <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp;
