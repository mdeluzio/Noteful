import React, { Component } from 'react';

class FolderListError extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {      
            return (
              <p>An error occured with the Folder List. Try again later</p>
            );
          }
          return this.props.children;
    }
}

export default FolderListError;