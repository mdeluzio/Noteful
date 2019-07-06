import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import DUMMYSTORE from './dummy-store';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DUMMYSTORE
    }
  }
  render() {
    return (
      <div className='App'>
        <header className='App__heading'>
          <Link 
            to='/'
            className='title-link'
          >
            Noteful
          </Link>
        </header>
        <div className='main-container'>
          <section className="Sidebar">
            <Route
              exact path='/'
              component={Sidebar} 
            />
          </section>
          <main>
            <Route
              exact path='/'
              component={NoteList}
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;