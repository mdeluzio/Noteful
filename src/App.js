import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import DUMMYSTORE from './dummy-store';
import MainSidebar from './MainSidebar/MainSidebar';
import MainNoteList from './MainNoteList/MainNoteList';
import SidebarFolder from './SidebarFolder/SidebarFolder';
import NoteListFolder from './NoteListFolder/NoteListFolder';
import NoteListNote from './NoteListNote/NoteListNote';
import './App.css'
import SidebarNote from './SidebarNote/SidebarNote';

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
              render={() =>
                <MainSidebar 
                  folder={this.state.DUMMYSTORE.folders} 
                />
              }
            />
            <Route 
              path='/folder/:folderId'
              render={(routeProps) =>
                <SidebarFolder
                  routeProps={routeProps}
                  folder={this.state.DUMMYSTORE.folders}
                />
              }
            />
            <Route
              path='/note/:noteId'
              render={(routeProps) => 
                <SidebarNote
                  folder={this.state.DUMMYSTORE.folders}
                  notes={this.state.DUMMYSTORE.notes}
                  routeProps={routeProps}
                  onClickGoBack={() => routeProps.history.goBack()}
                />} 
            />
          </section>
          <main>
            <Route
              exact path='/'
              render={() =>
                <MainNoteList
                  notes={this.state.DUMMYSTORE.notes} 
                />}
            />
            <Route 
              path='/folder/:folderId'
              render={(routeProps) => 
                <NoteListFolder
                  routeProps={routeProps}
                  notes={this.state.DUMMYSTORE.notes}
                />
              }
            />
            <Route 
              path='/note/:noteId'
              render={(routeProps) =>
                <NoteListNote
                  notes={this.state.DUMMYSTORE.notes}
                  routeProps={routeProps} 
                />  
              } 
            />
          </main>
        </div>
      </div>
    );
  }
}

export default App;