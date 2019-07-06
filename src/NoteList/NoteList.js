import React, { Component } from 'react';
import DUMMYSTORE from '../dummy-store';
import { Link } from 'react-router-dom';
import './NoteList.css';

class NoteList extends Component {
    render() {
        return (
            <div className='NoteList'>
                <ul className='NoteList-list'>
                    {DUMMYSTORE.notes.map(note => 
                        <li className='NoteList-li' key={note.id}>
                            <Link to={`/note/${note.id}`}>
                                {note.name}
                            </Link>
                            <p>Date modified on {note.modified}</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default NoteList;