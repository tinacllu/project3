import SearchForm from './SearchForm';
import Papers from './Papers';
import ChangePage from './ChangePage';

const SearchPage = ({ getQueryParams, publications, handleLikeOrSave, handleResultPages, favList, savedList, newSearch, setNewSearch, numResults, showLoading, apiQuery}) => {

    return(
        <section className='searchPage wrapper'>
            <SearchForm getQueryParams={getQueryParams} setNewSearch={setNewSearch}/> 
            
            {
            // once API call is completed, show the results on the page
            showLoading
                ? (<div className="loading-icon">
                        <p>Loading...</p>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>)
                : apiQuery
                    ? <Papers publications={publications} handleLikeOrSave={handleLikeOrSave} favList={favList} savedList={savedList} />
                    : null
            }
            
            {
            // when user clicks search, if there are no results from the API call once it has been completed and the search parameters are not empty, then show no results
            !newSearch
                ? null
                : (numResults === 1 && publications.length===0 && !showLoading && apiQuery)
                    ? <p className='wrapper'>No results.</p>
                    : null
            }
                        
            {
            // when the API call has been completed, show page change buttons if the user has entered search parameters, otherwise, ask users to input desired search parameters if they are starting a new search
            !showLoading
                ? apiQuery
                    ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                    : !newSearch
                        ? null
                        :<p className='wrapper'>Please enter your search parameters.</p>
                : null    
            }

      </section>
    )
};

export default SearchPage;