import Papers from "./Papers";

const SavedPage = ({ handleLikeOrSave, favList, savedList }) => {
    const pubArray = [];

    savedList.forEach((savedItem)=> {
        if (savedItem.key !== 'placeholder') {
         pubArray.push({...savedItem.name, savedStatus: true}); 
        }
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