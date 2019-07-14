import React, { Component } from 'react';
import Context from '../context';
import './AddFolder.css';

class AddFolder extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state= {
            folder: {
                value: ''
            }
        }
    }

    updateFolder = (folder) => {
        this.setState({
            folder: {
                value: folder
            }
        })
    }

    handleAddFolder = (e) => {
        e.preventDefault();
        const foldername = this.state.folder.value;
        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
                "name": foldername
            })
          })
          .then(res => {
              if(!res.ok) {
                  return res.json().then(error => {
                      throw error
                    })
                }
                return res.json()
            })
            .then((responseJson) => {
                this.context.addFolder(responseJson)
            })
            .then(this.props.history.push('/'))
            .catch(error => {
                console.error({ error })
              })
    }


   
    render() {
        return(
            <div className='AddFolder'>
                <form className='add-folder-form' onSubmit={e => this.handleAddFolder(e)}>
                    <h2>Add Folder</h2>
                    <label htmlFor='add-folder'>Folder name:</label>
                    <input 
                        type='text' 
                        name='add-folder' 
                        id='add-folder'
                        onChange={e => this.updateFolder(e.target.value)}
                    />
                    <button 
                        className='submit-button'
                        type='submit'
                        disabled= {this.state.folder.value.length === 0}
                    >
                        Add
                    </button>
                </form>
            </div>
        )
    }
}

export default AddFolder;