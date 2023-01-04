import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MainContext } from '../App';

import firebaseConfig from './Firebase';
import { getDatabase, ref, child, get } from 'firebase/database';

const NotesIcon = ( { publication }) => {
  const { accountDetails } = useContext(MainContext);
  const { paramsUsername } = useParams();
  const [ hasNotes, setHasNotes ] = useState(false);

  useEffect(() => {
    const regex = /[^A-Za-z0-9]/g;
    const filteredDoi = publication.doi.replace(regex, '');

    const database = getDatabase(firebaseConfig);
    const dbRef = ref(database, `/${accountDetails.username}/notes`);

    get(child(dbRef, `${filteredDoi}`)).then((snapshot) => {
      if (snapshot.exists()) {
          setHasNotes(true);
      } else {
        setHasNotes(false);
      }
    }).catch((error) => {
      alert('Oh no! Something went wrong!');
    });
    
  }, []);

  return (
    <Link to={`/${paramsUsername}/${publication.uuid}`} state={{ from: 'notesIcon', publication: publication }}>
        <button title='Notes'>
          {
            hasNotes
              ? <i className="fa-solid fa-note-sticky"></i>
              : <i className="fa-regular fa-note-sticky"></i>
          }
        </button>
    </Link>
  )
}

export default NotesIcon