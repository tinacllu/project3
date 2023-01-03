import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../App';

const SavedIcon = ( {publication} ) => {
    const [ saved, setSaved ] = useState(false);
    const { handleLikeOrSave, savedList} = useContext(MainContext);

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
        // eslint-disable-next-line
    }, []);

    return(
        <button title='Save' onClick={() => {handleLikeOrSave('saved', publication); setSaved(!saved)}}>
            {
                saved 
                    ? <i className="fa-solid fa-bookmark"></i>
                    : <i className='fa-regular fa-bookmark'></i>
            }
            
        </button>
    )
};

export default SavedIcon;