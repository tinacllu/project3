import { useState } from 'react';
import Abstract from './Abstract';
import Authors from './Authors';
import HeartIcon from './HeartIcon';

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
                                <HeartIcon handleLike={props.handleLike} publication={publication}/>
                                <button>
                                    <i className='fa-regular fa-bookmark'></i>
                                </button>
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