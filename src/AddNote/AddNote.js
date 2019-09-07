import React, { Component } from 'react';
import Context from '../context';
import './AddNote.css';
import ValidationError from '../ValidationError/ValidationError';


class AddNote extends Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            content: {
                value: ''
            },
            folder: {
                value: ''
            }
        };
    }

    updateName = (name) => {
        this.setState({
            name: {
                value: name,
                touched: true
            }
        });
    }

    updateContent = (content) => {
        this.setState({
            content: {
                value: content
            }
        });
    }

    updateFolder = (folder) => {
        this.setState({
            folder: {
                value: folder
            }
        })
    }

    handleAddNote = e => {
        e.preventDefault();

        fetch(`http://localhost:8000/api/notes`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
                "modified": new Date(),
                "name": this.state.name.value,
                "folderid": this.state.folder.value,
                "content": this.state.content.value
            })
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json();
        })
        .then(responseJson => {
            this.context.addNote(responseJson)
        })
        .then(this.props.history.push('/'))
        .catch(error => {
            console.error({ error })
        })
    }

    validateName = () => {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return 'Name is required'
        };
    }

    render() {
        return (
            <div className='AddNote'>
                <form className='add-note-form' onSubmit={e => this.handleAddNote(e)}>
                    <h2>Add new note</h2>
                    <div className='form-group'>
                        <label htmlFor='name'>
                            Name:
                        </label>
                        <input 
                            type='text'
                            className='name-input'
                            name='name'
                            id='name'
                            onChange={e => this.updateName(e.target.value)}
                        />
                        {this.state.name.touched && (
                            <ValidationError message={this.validateName()} />
                        )}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='content'>
                            Content:
                        
                        <textarea 
                            className='content-input'
                            name='content'
                            id='content'
                            onChange={e => this.updateContent(e.target.value)}
                        />
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='folder'>
                            Select a folder:
                        </label>
                        <select
                            id='folder'
                            size='3'
                            onChange={e => this.updateFolder(e.target.value)}
                        >
                        {this.context.folders.map(folder => 
                            <option 
                                key={folder.id} 
                                value={folder.id}
                            >
                            {folder.name}
                            </option> )
                        }
                        </select>
                    </div>
                    <button 
                    type='submit' 
                    className='submit-button'
                    disabled={this.validateName()}
                    >
                        Submit note
                    </button>
                </form>
            </div>
        )
    }
}


export default AddNote;