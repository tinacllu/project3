// import React from 'react';
// import { useContext, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { MainContext } from '../App';

// import Papers from './Papers';

// const SinglePaper = ( ) => {
//     const { accountDetails } = useContext(MainContext);
//     const location = useLocation();
//     const [ addNote, setAddNote ] = useState(false);
//     const [ textArea, setTextArea ] = useState('');
//     const [ notes, setNotes ] = useState([]);

//     const { publication } = location.state;
//     console.log(publication);

//   return (
//     <div className="singlePaper">
//         <Link className='exit' to={`/${accountDetails.username}`}>
//             <i className="fa-solid fa-x"></i>
//         </Link>
//         <Papers publications={[publication]}/>
//         {
//             addNote
//                 ? <>
//                 <button title='Minimize' onClick={() => setAddNote(false)}>
//                     <i className="fa-solid fa-minus"></i>
//                 </button>
//                 <form>
//                     <label htmlFor='note'>Add Note:</label>
//                     <textarea id='note' rows='4' cols='20' value={textArea} onChange={(e) => {setTextArea(e.target.value)}}></textarea>
//                     <button type='submit'>Add!</button>
//                 </form>
//                 </>
//                 : <button title='Add Note' onClick={() => setAddNote(true)}>
//                     <i className="fa-regular fa-plus"></i>
//                 </button>
//         }



//     </div>
    
//     // <Papers publications={[publication]} handleLikeOrSave={handleLikeOrSave} favList={favList} savedList={savedList}/>
//     // <p>hi</p>
//   )
// }

// export default SinglePaper