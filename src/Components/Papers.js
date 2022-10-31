import { useState } from 'react';
import Abstract from './Abstract';
import Authors from './Authors';
import Favourite from './Favourite';

const Papers = (props) => {
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
            {props.publications.map((publication) => {
                return(
                    <li key={publication.doi}>
                        <h2>{publication.title}</h2>
                        <Favourite handleLike={props.handleLike} publication={publication}/>
                        <Authors publication={publication}/>
                        <p>Publication Year: {publication.publicationDate.substring(0,4)}</p>
                        <button id={publication.doi} onClick={(e) => handleClick(e)}>
                            {
                                !displayAbstract
                                    ? <i className="fa-solid fa-chevron-down"></i>
                                    : buttonId === publication.doi
                                        ? <i className="fa-solid fa-chevron-up"></i>
                                        : <i className="fa-solid fa-chevron-down"></i>
                            }
                            
                        </button>
                        {
                            buttonId === publication.doi
                                ? <Abstract publication={publication}/>
                                : null
                        }
                    </li>
                )
            })}    
        </ul>
    )
};

export default Papers;