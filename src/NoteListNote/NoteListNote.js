import React, { Component } from 'react';
import './NoteListNote.css';
import { format } from 'date-fns';

class NoteListNote extends Component {
    render() {
        const currentNote = this.props.notes.find(note => 
            note.id === this.props.routeProps.match.params.noteId);
        return (
            <div className='NoteList'>
                <ul className='NoteList-list'>
                    <li className='NoteList-li' key={currentNote.id}>
                        {currentNote.name}
                        <p>Modified on {format(currentNote.modified, 'DD MMM YYYY')}</p>
                    </li>
                </ul>
                <p className='content'>{currentNote.content}</p>
            </div>
        )
    }
}

export default NoteListNote;