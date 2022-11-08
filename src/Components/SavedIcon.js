import { useState, useEffect } from 'react';

const SavedIcon = ({handleLikeOrSave, publication, savedList}) => {
    const [ saved, setSaved ] = useState(false);

    //if the publication is in fav list, then set saved to true, else set saved to false
    useEffect(() => {
        const savedListDoiArray = [];
        savedList.forEach((savedItem) => {
          savedListDoiArray.push(savedItem['name']['doi'])
        });

        if (savedListDoiArray.includes(publication.doi)) {
            setSaved(true);
        } else {
            setSaved(false);
        }
    }, []);

    console.log(publication);
    return(
        <button onClick={() => {handleLikeOrSave('saved', publication); setSaved(!saved)}}>
            {
                saved 
                    ? <i className="fa-solid fa-bookmark"></i>
                    : <i className='fa-regular fa-bookmark'></i>
            }
            
        </button>
    )
};

export default SavedIcon;