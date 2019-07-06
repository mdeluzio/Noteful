import React, { Component } from 'react';
import './SidebarNote.css';


class SidebarNote extends Component {
    
    render() {
        const currentNote = this.props.notes.find(note => 
            note.id === this.props.routeProps.match.params.noteId)
        const currentFolder = this.props.folder.find(folder => 
            folder.id === currentNote.folderId).name;
        return (
            <div className='Sidebar-div'>
                <h2 className='Sidebar-title'>Current Folder</h2>
                <button type='button' onClick={this.props.onClickGoBack}>
                     Go Back
                </button>
                <ul className='folder-list'>
                    <li>
                        <h3 className='current-folder-name'>{currentFolder}</h3>
                    </li>
                </ul>
            </div>
        )
    }
}

export default SidebarNote;