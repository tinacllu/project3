import { useState } from 'react';
import Abstract from './Abstract';
import Authors from './Authors';

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
        <ul>
            {/* show loading screen while api call is going on */}
            {/* add a message if the api search doesn't come back with anything */}
            {props.publications.map((publication) => {
                return(
                    <li key={publication.doi}>
                        <h2>{publication.title}</h2>
                        <Authors publication={publication}/>
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
            {/* add ternary to show No results, if the passed props array is empty */}
            
        </ul>
    )
};

export default Papers;