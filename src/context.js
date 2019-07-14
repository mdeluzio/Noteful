import React from 'react';

const Context = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addFolder: () => {},
    addNote: () => {}
});

export default Context;

