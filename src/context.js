import React from 'react';

const Context = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    handlePush: () => {}
});

export default Context;

