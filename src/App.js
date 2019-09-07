import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MainSidebar from './MainSidebar/MainSidebar';
import MainNoteList from './MainNoteList/MainNoteList';
import SidebarFolder from './SidebarFolder/SidebarFolder';
import NoteListFolder from './NoteListFolder/NoteListFolder';
import NoteListNote from './NoteListNote/NoteListNote';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import SidebarNote from './SidebarNote/SidebarNote';
import Context from './context';
import FolderListError from './FolderListError/FolderListError';
import NoteListError from './NoteListError/NoteListError';
import PostError from './PostError/PostError';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/folders')
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

    fetch('http://localhost:8000/api/notes')
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

  handleClickDelete = (e, callback) => {
    e.preventDefault();
    const noteId = e.target.value;

    fetch(`http://localhost:8000/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
      .then(res => {
          if(!res.ok) {
              return res.json().then(error => {
                  throw error
                })
          }
          if(callback) {
            callback();
          }  
      })
      .catch(error => {
        console.error({ error })
      })

  }
  handleDeleteNote = noteId => {
    this.setState({
        notes: this.state.notes.filter(note => note.id !== parseInt(noteId, 10))
    });
  };

  handleAddFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  handleAddNote = newNote => {
    this.setState({
      notes: [...this.state.notes, newNote]
    })
  }
 

  render() {
    const value = { 
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addNote: this.handleAddNote
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
              <FolderListError>
                <Route
                  exact path='/'
                  component={MainSidebar}
                />
                <Route 
                  path={['/folder/:folderid', '/addfolder', '/addnote']}
                  component={SidebarFolder}
                />
                <Route
                  path='/note/:noteId'
                  component={SidebarNote}
                />
              </FolderListError>
            </section>
            <main>
              <NoteListError>
                <Route
                  exact path='/'
                  component={MainNoteList}
                />
                <Route 
                  path='/folder/:folderid'
                  component={NoteListFolder}
                />
                <Route 
                  path='/note/:noteId'
                  render= {(routeProps) =>
                  <NoteListNote
                    handleClickDelete={this.handleClickDelete}
                    routeProps={routeProps} />
                  }
                />
              </NoteListError>
              <PostError>
                <Route
                  path={'/addfolder'}
                  render={(routeProps) => 
                    <AddFolder
                    handleAddFolder={this.handleAddFolder}
                    routeProps={routeProps} />}
                />
                <Route
                  path={'/addnote'}
                  component={AddNote}
                />
              </PostError>
            </main>
          </div>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
