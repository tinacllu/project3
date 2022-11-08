import { useState, useEffect } from 'react';

const HeartIcon = ( {handleLikeOrSave, publication, favList} ) => {
    const [ liked, setLiked ] = useState(false);

    // if the publication is in fav list, then set liked to true, else set liked to false
    useEffect(() => {
        const favListDoiArray = [];
        favList.forEach((favItem) => {
          favListDoiArray.push(favItem['name']['doi'])
        });

        if (favListDoiArray.includes(publication.doi)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [])

    return(
        // create a ternary for setLiked (use ternary and specifically say true or false instead)
        <button onClick={() => {handleLikeOrSave('favourites', publication); setLiked(!liked)}}>
            {
                liked
                    ? <i className="fa-solid fa-heart"></i>
                    : <i className="fa-regular fa-heart"></i>
            }
        </button>
    )
}

export default HeartIcon;