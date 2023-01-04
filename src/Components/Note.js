import React from 'react';
import { useState, useContext} from 'react';
import { MainContext } from '../App';

import firebaseConfig from './Firebase';
import { getDatabase, ref, remove, update } from 'firebase/database';

const Note = ( { note, filteredDoi } ) => {
    const { accountDetails } = useContext(MainContext);
    const [ editMode, setEditMode ] = useState(false);
    const [ editNote, setEditNote ] = useState('');

    const database = getDatabase(firebaseConfig);
    const dbRef = ref(database, `/${accountDetails.username}/notes/${filteredDoi}/${note.key}`);

    const handleEdit = (e) => {
        e.preventDefault();
        setEditMode(false);
        // update(dbRef, {editNote});
    }

    const handleDelete = () => {
        remove(dbRef);
        console.log('deleted');
    }

    return (
        <li key={note.key}>
        {
            editMode
                ? <form onSubmit={(e) => {handleEdit(e)}}>
                    <input type='text' placeholder={note.note} value={editNote} onChange={(e) => setEditNote(e.target.value)}></input>
                    <button><i className="fa-solid fa-check"></i></button>
                    </form>
                : <>
                    <i className="fa-solid fa-pen" onClick={() => setEditMode(true)}></i>
                    <i className="fa-solid fa-trash" onClick={() => handleDelete()}></i>
                    {note.note}
                </>
        }
        </li>
    )
}

export default Note