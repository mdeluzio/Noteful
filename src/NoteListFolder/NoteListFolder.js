import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './NoteListFolder.css';
import Context from '../context';

class NoteListFolder extends Component {
    static contextType = Context;

    handleClickDelete = e => {
        e.preventDefault();
        const noteId = e.target.value;

        fetch(`https://agile-island-09322.herokuapp.com/api/notes/${noteId}`, {
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
                this.context.deleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
              })
    }

    render() {
        const filteredContext = this.context.notes.filter(note => 
                note.folderid === parseInt(this.props.match.params.folderid, 10));
                
        return (
            <div className='NoteList'>
                <ul className='NoteList-list'>
                    {filteredContext.map(note => 
                        <li className='NoteList-li' key={note.id}>
                            <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                            <p>Modified on {format(note.modified, 'DD MMM YYYY')}</p>
                            <button
                                value={note.id}
                                onClick={this.handleClickDelete}>
                                Delete
                            </button>
                        </li>
                    )}
                    <li>
                        <Link 
                            className='add-note-button'
                            to={'/addnote'}
                        >
                            Add Note
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default NoteListFolder;