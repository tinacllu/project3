import Papers from "./Papers";

const FavouritePage = ( { handleLike, favList }) => {
    console.log(favList);
    console.log(favList[0].name)
    console.log(favList[0].name.doi);
    const pubArray = []
    favList.forEach((favItem)=> {
       console.log(favItem.name);
       pubArray.push(favItem.name); 
    })
    console.log(pubArray);
    return(
        <section className="favouritesPage wrapper">
            <p>🚧 This page is currently under construction 🚧</p>
            {/* <Papers publications={pubArray} handleLike={handleLike} favList={favList} /> */}
        </section>
        
    )
}

export default FavouritePage;