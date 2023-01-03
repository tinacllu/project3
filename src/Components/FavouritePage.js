import Papers from "./Papers";
import { useContext, useEffect } from "react";
import { MainContext } from '../App';
import { useParams } from "react-router-dom";

const FavouritePage = () => {
    const pubArray = [];
    const { paramsUsername } = useParams();
    const { favList, handleLikeOrSave, savedList, accountDetails, setAccountDetails }= useContext(MainContext);

    useEffect(() => {
        if (!accountDetails.username) {
            setAccountDetails({...accountDetails, username: paramsUsername})
        }
    }, [accountDetails, paramsUsername, setAccountDetails]);

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