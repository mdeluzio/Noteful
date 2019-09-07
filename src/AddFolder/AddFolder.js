import React, { Component } from 'react';
import './AddFolder.css';
import PropTypes from 'prop-types';

class AddFolder extends Component {
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
        fetch(`https://agile-island-09322.herokuapp.com/api/folders`, {
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
                this.props.handleAddFolder(responseJson)
            })
            .then(this.props.routeProps.history.push('/'))
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

AddFolder.propTypes = {
    handleAddFolder: PropTypes.func,
    routeProps: PropTypes.object
}

export default AddFolder;