import React, { Component } from 'react';
import './NoteListNote.css';
import { format } from 'date-fns';
import Context from '../context';

class NoteListNote extends Component {
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
                this.context.handlePush()
            })
            .catch(error => {
                console.error({ error })
              })
    }

    render() {
        const currentNote = this.context.notes.find(note => 
            note.id === this.props.match.params.noteId);
        return (
            <div className='NoteList'>
                <ul className='NoteList-list'>
                    <li className='NoteList-li' key={currentNote.id}>
                        {currentNote.name}
                        <p>Modified on {format(currentNote.modified, 'DD MMM YYYY')}</p>
                        <button
                            value={currentNote.id}
                            onClick={this.handleClickDelete}>
                            Delete
                        </button>
                    </li>
                </ul>
                <p className='content'>{currentNote.content}</p>
            </div>
        )
    }
}

export default NoteListNote;