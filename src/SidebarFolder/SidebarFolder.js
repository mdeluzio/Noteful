import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarFolder.css';
import Context from '../context';


class SidebarFolder extends Component {
    static contextType = Context;
   
    render() {
        return (
            <div className='Sidebar-div'>
                <h2 className='Sidebar-title'>Folders</h2>
                <ul className='folder-list'>
                    {this.context.folders.map(folder => 
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