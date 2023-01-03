import Papers from "./Papers";

import { useContext, useEffect } from "react";
import { MainContext } from '../App';
import { useParams } from "react-router-dom";

const SavedPage = () => {
    const pubArray = [];
    const { paramsUsername } = useParams();
    const { favList, handleLikeOrSave, savedList, setAccountDetails, accountDetails }= useContext(MainContext);

    useEffect(() => {
        if (!accountDetails.username) {
            setAccountDetails({...accountDetails, username: paramsUsername})
        }
    }, [accountDetails, paramsUsername, setAccountDetails]);

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