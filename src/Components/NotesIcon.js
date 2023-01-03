// import React from 'react';
// import { useState, useContext } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { MainContext } from '../App';

// const NotesIcon = ( { publication }) => {
//     // const { handleLikeOrSave, favList, savedList }= useContext(MainContext);
//     const { paramsUsername } = useParams();

//     // save a notes section in firebase using uuid as key
//     // 
//   return (
//     // <Link to={`/${paramsUsername}/${publication.uuid}`} state={{ from: 'notesIcon', publication: publication, handleLikeOrSave: handleLikeOrSave, favList: favList, savedList: savedList }}>
//     <Link to={`/${paramsUsername}/${publication.uuid}`} state={{ from: 'notesIcon', publication: publication }}>
//         <button title='Notes'>
//             <i className="fa-regular fa-note-sticky"></i>
//         </button>
//     </Link>
//   )
// }

// export default NotesIcon