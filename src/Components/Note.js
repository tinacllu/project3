import React from 'react';
import { useState, useContext} from 'react';
import { MainContext } from '../App';

import firebaseConfig from './Firebase';
import { getDatabase, ref, remove, update } from 'firebase/database';

const Note = ( { note, filteredDoi } ) => {
    const { accountDetails } = useContext(MainContext);
    const [ editMode, setEditMode ] = useState(false);
    const [ editNote, setEditNote ] = useState(note.note);

    const database = getDatabase(firebaseConfig);
    const dbRef = ref(database, `/${accountDetails.username}/notes/${filteredDoi}/${note.key}`);

    const handleEdit = (e) => {
        e.preventDefault();
        setEditMode(false);
        update(dbRef, {note: editNote});
        setEditNote('');
    }

    const handleDelete = () => {
        remove(dbRef);
    }

    return (
        <li className='note'>
            {
                editMode
                    ? <form className='editNote' onSubmit={(e) => {handleEdit(e)}}>
                        <textarea placeholder={note.note} value={editNote} onChange={(e) => setEditNote(e.target.value)}></textarea>
                        <button><i className="fa-solid fa-check"></i></button>
                    </form>
                    : <>
                    {note.note}
                    <div className="icons">
                        <i className="fa-solid fa-pen" onClick={() => {setEditMode(true); setEditNote(note.note)}}></i>
                        <i className="fa-solid fa-trash" onClick={() => handleDelete()}></i>
                    </div>
                    </>
            }
        </li>
    )
}

export default Note