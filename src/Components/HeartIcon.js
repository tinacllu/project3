import { useState } from 'react';

const HeartIcon = ( {handleLike, publication} ) => {
    const [ liked, setLiked ] = useState(false);

    return(
        <button onClick={() => {handleLike(liked, publication); setLiked(!liked)}}>
            {
                liked
                    ? <i className="fa-solid fa-heart"></i>
                    : <i className="fa-regular fa-heart"></i>
            }
        </button>
    )
}

export default HeartIcon;