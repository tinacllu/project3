import { useState } from 'react';

const SavedIcon = () => {
    const [ saved, setSaved ] = useState(false);
    return(
        <button onClick={() => setSaved(!saved)}>
            {
                saved 
                    ? <i className="fa-solid fa-bookmark"></i>
                    : <i className='fa-regular fa-bookmark'></i>
            }
            
        </button>
    )
};

export default SavedIcon;