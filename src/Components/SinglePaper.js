import React from 'react';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

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
            if (data) {
                for (let key in data) {
                    newState.push({note:data[key]['note'], key: key});
                    setNotes(newState);
                }
            } else {
                setNotes([]);
            }
            
        });
        // eslint-disable-next-line
    }, []);

    const handleAddNotes = (e) => {
        e.preventDefault();
        setTextArea('');
        push(dbRef, {note: textArea});
    };

    return (
        <section className="singlePaper">
            <div className="paperContainer">
                <button className='exit' onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <Papers publications={[publication]}/>
                
                <div className="notesHeader">
                    <div className="notesHeaderMain">
                        <h3 className='logo'>Notes</h3>
                        {
                            addNote 
                                ?<button title='Minimize' onClick={() => setAddNote(false)}>
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                :<button title='Add Note' onClick={() => setAddNote(true)}>
                                    <i className="fa-regular fa-plus"></i>
                                </button>
                        }
                    </div>
                    {
                        addNote
                            ? 
                            <form onSubmit={(e) => {handleAddNotes(e)}}>
                                <label htmlFor='note'>Add Note:</label>
                                <textarea id='note' rows='4' cols='20' value={textArea} onChange={(e) => {setTextArea(e.target.value)}}></textarea>
                                <button type='submit'>Add!</button>
                            </form>
                            : null
                    }
                </div>
                <ul className="notesContainer">
                    {

                        notes.map((note) => {
                            return <Note key={note.key} note={note} filteredDoi={filteredDoi} />
                        })
                    }
                </ul>
            </div>
        </section>
  )
}

export default SinglePaper