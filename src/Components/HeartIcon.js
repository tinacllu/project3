import { useState, useEffect } from 'react';

const HeartIcon = ( {handleLike, publication, favList} ) => {
    const [ liked, setLiked ] = useState(false);

    // if the publication is in fav list, then set liked to true, else set liked to true
    useEffect(() => {
        const favListDoiArray = [];
        favList.forEach((favItem) => {
          favListDoiArray.push(favItem['name']['doi'])
        });

        if (favListDoiArray.includes(publication.doi)) {
            console.log('in fav');
            setLiked(true);
        } else {
            console.log('no one likes you');
            setLiked(false);
        }
    }, [])

    return(
        // create a ternary for setLiked (use ternary and specifically say true or false instead)
        <button onClick={() => {handleLike(publication); setLiked(!liked)}}>
            {
                liked
                    ? <i className="fa-solid fa-heart"></i>
                    : <i className="fa-regular fa-heart"></i>
            }
        </button>
    )
}

export default HeartIcon;