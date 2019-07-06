import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainSidebar.css';


class MainSidebar extends Component {
    
    render() {
        return (
            <div className='Sidebar-div'>
                <h2 className='Sidebar-title'>Folders</h2>
                <ul className='folder-list'>
                    {this.props.folder.map(folder => 
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

export default MainSidebar;