import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainSidebar from './MainSidebar/MainSidebar';
import MainNoteList from './MainNoteList/MainNoteList';
import SidebarFolder from './SidebarFolder/SidebarFolder';
import NoteListFolder from './NoteListFolder/NoteListFolder';
import NoteListNote from './NoteListNote/NoteListNote';
import './App.css'
import SidebarNote from './SidebarNote/SidebarNote';
import Context from './context';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(folderData => {
      this.setState({
        folders: folderData
      })
    })
    .catch(err => {
      console.error(err)
    });

    fetch('http://localhost:9090/notes')
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(noteData => {
      this.setState({
        notes: noteData
      })
    })
    .catch(err => {
      console.error(err)
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handlePush = () => {
    this.props.history.push('/')
  }
 

  render() {
    const value = { 
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      handlePush: this.handlePush
    };

    return (
      <Context.Provider value={value}>
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
                component={MainSidebar}
              />
              <Route 
                path='/folder/:folderId'
                component={SidebarFolder}
              />
              <Route
                path='/note/:noteId'
                component={SidebarNote}
              />
            </section>
            <main>
              <Route
                exact path='/'
                component={MainNoteList}
              />
              <Route 
                path='/folder/:folderId'
                component={NoteListFolder}
              />
              <Route 
                path='/note/:noteId'
                component={NoteListNote}
              />
            </main>
          </div>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
