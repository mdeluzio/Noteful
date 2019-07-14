import React, { Component } from 'react';

class PostError extends Component {
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
              <p>An error occured while creating a new folder/note. Try again later</p>
            );
          }
          return this.props.children;
    }
}

export default PostError;