import { useState } from 'react';
import Abstract from './Abstract';
// pass down title, authors, and abstract as props
const Papers = () => {
    const [ displayAbstract, setDisplayAbstract ] = useState(false);
    
    const handleClick = () => {
        setDisplayAbstract(!displayAbstract);
    }
    return(
        <li>
            <h2>Title</h2>
            <p>Authors</p>
            <button onClick={() => handleClick()}>
                {
                    displayAbstract
                        ? <i class="fa-solid fa-chevron-up"></i>
                        : <i class="fa-solid fa-chevron-down"></i>
                }
                
            </button>
            {
                displayAbstract 
                    ? <Abstract />
                    : null
            }
        </li>
    )
};

export default Papers;