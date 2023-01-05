import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../App';

const HeartIcon = ( {publication} ) => {
    const [ liked, setLiked ] = useState(false);
    const {handleLikeOrSave, favList} = useContext(MainContext);

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
        // eslint-disable-next-line
    }, [])

    return(
        // create a ternary for setLiked (use ternary and specifically say true or false instead)
        <button title='Favourite' onClick={() => {handleLikeOrSave('favourites', publication); setLiked(!liked)}}>
            {
                liked
                    ? <i className="fa-solid fa-heart"></i>
                    : <i className="fa-regular fa-heart"></i>
            }
        </button>
    )
}

export default HeartIcon;