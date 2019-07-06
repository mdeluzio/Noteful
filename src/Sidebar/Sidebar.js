import React, { Component } from 'react';
import DUMMYSTORE from '../dummy-store';
import { Link } from 'react-router-dom';
import './Sidebar.css';


class Sidebar extends Component {
    
    render() {
        return (
            <div className='Sidebar-div'>
                <h2 className='Sidebar-title'>Folders</h2>
                <ul className='folder-list'>
                    {DUMMYSTORE.folders.map(folder => 
                        <li className='folder-li' key={folder.id}>
                            <Link className='folder-link' to={`/folder/${folder.id}`}>
                                {folder.name}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Sidebar;