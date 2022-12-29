import Papers from "./Papers";

import { useContext } from "react";
import { MainContext } from "./Main";

const FavouritePage = () => {
    const pubArray = [];
    const { favList, handleLikeOrSave, savedList, accountDetails }= useContext(MainContext);
    
    // loop through each item that has been saved as favourite in firebase, then add it to pubArray and display to the page
    favList.forEach((favItem)=> {
        pubArray.push({...favItem.name, favStatus: true}); 
    });


    return(
        <section className="favouritesPage wrapper">
            {
                pubArray.length === 0 
                    ? (<div className='wrapper emptyListMsg'>
                        <p>No favourites yet!</p> 
                        <p>Browse some papers and use the heart icon to add them to your favourites list ❤</p>
                        </div>)
                    :<Papers publications={pubArray} handleLikeOrSave={handleLikeOrSave} favList={favList} savedList={savedList}/>
            }
        </section>
    )
}

export default FavouritePage;