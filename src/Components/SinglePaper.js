import React from 'react';
import { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { MainContext } from '../App';
import Note from './Note';
import Papers from './Papers';

import firebaseConfig from './Firebase';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { useEffect } from 'react';

const SinglePaper = ( ) => {
    const { accountDetails } = useContext(MainContext);

    const location = useLocation();
    const { publication } = location.state;

    const [ addNote, setAddNote ] = useState(false);
    const [ textArea, setTextArea ] = useState('');
    const [ notes, setNotes ] = useState([]);

    const regex = /[^A-Za-z0-9]/g;
    const filteredDoi = publication.doi.replace(regex, '');

    const database = getDatabase(firebaseConfig);
    const dbRef = ref(database, `/${accountDetails.username}/notes/${filteredDoi}`);

    useEffect(() => {
        onValue(dbRef, (response) => {
            const newState = [];
            const data = response.val();
            for (let key in data) {
                console.log(data[key], key, 'marioo')
                newState.push({note:data[key], key: key});
                setNotes(newState);
            }
        });
    }, []);

    const handleAddNotes = (e) => {
        e.preventDefault();
        setTextArea('');
        push(dbRef, textArea);
    }

    return (
        <section className="singlePaper">
            <Link className='exit' to={`/${accountDetails.username}`}>
                <i className="fa-solid fa-x"></i>
            </Link>
            <Papers publications={[publication]}/>
            {
                addNote
                    ? <>
                    <button title='Minimize' onClick={() => setAddNote(false)}>
                        <i className="fa-solid fa-minus"></i>
                    </button>
                    <form onSubmit={(e) => {handleAddNotes(e)}}>
                        <label htmlFor='note'>Add Note:</label>
                        <textarea id='note' rows='4' cols='20' value={textArea} onChange={(e) => {setTextArea(e.target.value)}}></textarea>
                        <button type='submit'>Add!</button>
                    </form>
                    </>
                    : <button title='Add Note' onClick={() => setAddNote(true)}>
                        <i className="fa-regular fa-plus"></i>
                    </button>
            }
            <ul className="notesContainer">
                {

                    notes.map((note) => {
                        return <Note note={note} filteredDoi={filteredDoi} />
                    })
                }
            </ul>
        </section>
  )
}

export default SinglePaper