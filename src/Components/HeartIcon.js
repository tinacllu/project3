import { useState, useEffect } from 'react';

const HeartIcon = ( {handleLike, publication, favList} ) => {
    const [ liked, setLiked ] = useState(false);
    const [ pubWithFavStatus, setPubWithFavStatus ]= useState({});
    useEffect(() => {
        favList.forEach((favItem) => {
            if (favItem.name.doi === publication.doi) {
                const pubObj = {...publication, favStatus: true}
                // console.log("'it's a match!")
                setPubWithFavStatus(pubObj)
                // setLiked(true);
            } else {
                const pubObj = {...publication, favStatus: false}
                // console.log("not a match!")
                setPubWithFavStatus(pubObj)
                // setLiked(false);
            }
        });
    }, [liked]);
    

    return(
        // create a ternary for setLiked (use ternary and specifically say true or false instead)
        <button onClick={() => {handleLike(!liked, pubWithFavStatus); setLiked(!liked)}}>
            {
                liked
                    ? <i className="fa-solid fa-heart"></i>
                    : <i className="fa-regular fa-heart"></i>
            }
        </button>
    )
}

export default HeartIcon;