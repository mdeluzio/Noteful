import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './NoteListFolder.css';

class NoteListFolder extends Component {
    render() {
        const filteredProps = this.props.notes.filter(note => 
                note.folderId === this.props.routeProps.match.params.folderId);
                
        return (
            <div className='NoteList'>
                <ul className='NoteList-list'>
                    {filteredProps.map(note => 
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

export default NoteListFolder;