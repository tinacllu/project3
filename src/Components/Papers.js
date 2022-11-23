import { useState } from 'react';
import Abstract from './Abstract';
import Authors from './Authors';
import HeartIcon from './HeartIcon';
import SavedIcon from './SavedIcon';

const Papers = ( { publications, handleLikeOrSave, favList, savedList } ) => {
    const [ displayAbstract, setDisplayAbstract ] = useState(false);
    const [ buttonId, setbuttonId ] = useState('');
    const handleClick = (e) => {
        if (buttonId === '' || buttonId !== e.target.parentElement.id) {
            setbuttonId(e.target.parentElement.id);
            setDisplayAbstract(true);
        } else {
            setbuttonId('')
            setDisplayAbstract(false);
        }
    }

    return(
        <ul className='paperContainer'>
            {publications.map((publication) => {
                return(
                    <li key={publication.doi}>
                        <div className='visibleContainer'>
                            <div className='paperInfo'>
                                <h2>{publication.title}</h2>
                                <Authors publication={publication}/>
                                <p><span className='bold'>Publication Year:</span> {publication.publicationDate.substring(0,4)}</p>
                                <button id={publication.doi} onClick={(e) => handleClick(e)}>
                                    {
                                        !displayAbstract
                                            ? <i className='fa-solid fa-chevron-down'></i>
                                            : buttonId === publication.doi
                                                ? <i className='fa-solid fa-chevron-up'></i>
                                                : <i className='fa-solid fa-chevron-down'></i>
                                    }
                                </button>
                            </div>
                            <div className='icons'>
                                <HeartIcon handleLikeOrSave={handleLikeOrSave} publication={publication} favList={favList}/>
                                <SavedIcon handleLikeOrSave={handleLikeOrSave} publication={publication} savedList={savedList}/>
                            </div>
                        </div>
                        {
                            buttonId === publication.doi
                                ? <Abstract publication={publication} key={`abstract:${publication.doi}`}/>
                                : null
                        }
                    </li>
                )
            })}    
        </ul>
    )
};

export default Papers;