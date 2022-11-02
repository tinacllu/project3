import SearchForm from './SearchForm';
import Papers from './Papers';
import ChangePage from './ChangePage';

const SearchPage = ({ getQueryParams, publications, handleLike, handleResultPages, newSearch, setNewSearch, numResults, showLoading, apiQuery}) => {

    const loading = `<div id="container">
    <div class="divider" aria-hidden="true"></div>
    <p class="loading-text" aria-label="Loading">
      <span class="letter" aria-hidden="true">L</span>
      <span class="letter" aria-hidden="true">o</span>
      <span class="letter" aria-hidden="true">a</span>
      <span class="letter" aria-hidden="true">d</span>
      <span class="letter" aria-hidden="true">i</span>
      <span class="letter" aria-hidden="true">n</span>
      <span class="letter" aria-hidden="true">g</span>
    </p>
  </div>`
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
                    ? <Papers publications={publications} handleLike={handleLike}/>
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