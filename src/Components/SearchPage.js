import SearchForm from './SearchForm';
import Papers from './Papers';
import ChangePage from './ChangePage';

const SearchPage = ({ getQueryParams, setLandingPage, publications, handleLike, handleResultPages, newSearch, numResults, showLoading, landingPage, apiQuery}) => {
    return(
        <section className='searchPage wrapper'>
            <SearchForm getQueryParams={getQueryParams} setLandingPage={setLandingPage}/> 
            {
            showLoading
                ? <p className='loading wrapper'>Loading</p>
                : apiQuery
                    ? <Papers publications={publications} handleLike={handleLike}/>
                    : null
            }
            
            {
            landingPage 
                ? null
                : (numResults === 1 && publications.length===0)
                    ? showLoading
                        ? null
                        : <p className='wrapper'>No results. Please adjust your search parameters.</p>
                    : apiQuery
                        ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                        : <p className='wrapper'>Please enter your desired search paramters.</p>      
                    
            }
      </section>
    )
};

export default SearchPage;