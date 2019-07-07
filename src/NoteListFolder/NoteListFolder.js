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

        fetch(`http://localhost:9090/notes/${noteId}`, {
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
                return res.json()
            })
            .then(() => {
                this.context.deleteNote(noteId)
            })
            .catch(error => {
                console.error({ error })
              })
    }

    render() {
        const filteredContext = this.context.notes.filter(note => 
                note.folderId === this.props.match.params.folderId);
                
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
                </ul>
            </div>
        )
    }
}

export default NoteListFolder;