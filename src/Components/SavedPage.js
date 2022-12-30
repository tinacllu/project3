import Papers from "./Papers";

import { useContext } from "react";
import { MainContext } from '../App';

const SavedPage = () => {
    const pubArray = [];
    const { favList, handleLikeOrSave, savedList }= useContext(MainContext);

    savedList.forEach((savedItem)=> {
        pubArray.push({...savedItem.name, savedStatus: true}); 
    });


    return(
        <section className="savedPage wrapper">
            {pubArray.length === 0 
                    ? (<div className='wrapper emptyListMsg'>
                        <p>No saved items yet!</p> 
                        <p>Browse some papers and use the bookmark icon to add them to your saved list 🔖</p>
                        </div>)
                    :<Papers publications={pubArray} handleLikeOrSave={handleLikeOrSave} favList={favList} savedList={savedList}/>
            }
        </section>
    )
}

export default SavedPage;