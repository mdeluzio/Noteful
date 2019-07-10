import React, { Component } from 'react';
import './SidebarNote.css';
import Context from '../context';


class SidebarNote extends Component {
    static contextType = Context;
    

    handleClickGoBack = () => {
        this.props.history.goBack()
        };
    render() {
        let currentFolder = '';

        const currentNote = this.context.notes.find(note => 
            note.id === this.props.match.params.noteId)
        if(currentNote) {
         currentFolder = this.context.folders.find(folder => 
            folder.id === currentNote.folderId).name;
        } currentFolder = 'None'
            
        return (
            <div className='Sidebar-div'>
                <h2 className='Sidebar-title'>Current Folder</h2>
                <button type='button' onClick={this.handleClickGoBack}>
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