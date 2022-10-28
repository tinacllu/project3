import { useState } from 'react';
import Abstract from './Abstract';
// pass down title, authors, and abstract as props
const Papers = (props) => {
    const [ displayAbstract, setDisplayAbstract ] = useState(false);
    const handleClick = () => {
        setDisplayAbstract(!displayAbstract);
    }
    return(
        

        <ul>
            {/* add a message if the api search doesn't come back with anything */}
            {props.publications.map((publication) => {
                return(
                    <li key={publication.doi}>
                        <h2>{publication.title}</h2>
                        <p>authors</p>
                        <button onClick={() => handleClick()}>
                            {
                                displayAbstract
                                    ? <i className="fa-solid fa-chevron-up"></i>
                                    : <i className="fa-solid fa-chevron-down"></i>
                            }
                            
                        </button>
                        {
                            displayAbstract 
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