import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './MainNoteList.css';

class MainNoteList extends Component {
    render() {
        return (
            <div className='NoteList'>
                <ul className='NoteList-list'>
                    {this.props.notes.map(note => 
                        <li className='NoteList-li' key={note.id}>
                            <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                            <p>Modified on {format(note.modified, 'DD MMM YYYY')}</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default MainNoteList;