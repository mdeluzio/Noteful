import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarFolder.css';


class SidebarFolder extends Component {
    
    render() {
        return (
            <div className='Sidebar-div'>
                <h2 className='Sidebar-title'>Folders</h2>
                <ul className='folder-list'>
                    {this.props.folder.map(folder => 
                        <li className='folder-li' key={folder.id}>
                            <NavLink 
                                className='folder-link' 
                                to={`/folder/${folder.id}`}
                                activeStyle={{
                                    backgroundColor: 'lightblue'
                                }}
                            >
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default SidebarFolder;