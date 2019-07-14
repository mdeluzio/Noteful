import React, { Component } from 'react';
import './NoteListNote.css';
import { format } from 'date-fns';
import Context from '../context';
import PropTypes from 'prop-types';

class NoteListNote extends Component {
    static contextType = Context;

    handleClickDelete = e => {
        this.props.handleClickDelete(e, () => this.props.routeProps.history.push('/'))
        this.context.deleteNote(e.target.value);

    }

    render() {
        const currentNote = this.context.notes.find(note => 
            note.id === this.props.routeProps.match.params.noteId);
        const listItem = currentNote ? 
            <li className='NoteList-li' key={currentNote.id}>
                {currentNote.name}
                <p>Modified on {format(currentNote.modified, 'DD MMM YYYY')}</p>
                <button
                    value={currentNote.id}
                    onClick={this.handleClickDelete}>
                    Delete
                </button>
            </li>
            : null;
        const content = currentNote ? currentNote.content : null
        return (
            <div className='NoteList'>
                <ul className='NoteList-list'>
                    {listItem}
                </ul>
                <p className='content'>{content}</p>
            </div>
        )
    }
}

NoteListNote.propTypes = {
    handleClickDelete: PropTypes.func,
    routeProps: PropTypes.object
}

export default NoteListNote;