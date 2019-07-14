import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context';
import './MainSidebar.css';


class MainSidebar extends Component {
    static contextType = Context;

    render() {
        return (
            <div className='Sidebar-div'>
                <h2 className='Sidebar-title'>Folders</h2>
                <ul className='folder-list'>
                    {this.context.folders.map(folder => 
                        <li className='folder-li' key={folder.id}>
                            <Link className='folder-link' to={`/folder/${folder.id}`}>
                                {folder.name}
                            </Link>
                        </li>
                    )}
                    <li className='folder-li'>
                        <Link 
                            className='add-folder-button'
                            to={'/addfolder'}
                        >
                            Add Folder
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default MainSidebar;