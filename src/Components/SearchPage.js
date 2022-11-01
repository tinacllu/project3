import SearchForm from './SearchForm';
import Papers from './Papers';
import ChangePage from './ChangePage';

const SearchPage = ({ getQueryParams, setLandingPage, publications, handleLike, handleResultPages, newSearch, setNewSearch, numResults, showLoading, landingPage, apiQuery}) => {
    return(
        <section className='searchPage wrapper'>
            <SearchForm getQueryParams={getQueryParams} setLandingPage={setLandingPage} setNewSearch={setNewSearch}/> 
            
            {showLoading
                ? <p className='loading wrapper'>Loading</p>
                : apiQuery
                    ? <Papers publications={publications} handleLike={handleLike}/>
                    : null
            }
            
            
            {/* {landingPage 
                ? null
                : (numResults === 1 && publications.length===0)
                    ? showLoading
                        ? null
                        : <p className='wrapper'>No results. Please adjust your search parameters.</p>
                    : apiQuery
                        ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                        : <p className='wrapper'>Please enter your desired search paramters.</p>      
                    
            } */}


                {!newSearch
                    ? null
                    : (numResults === 1 && publications.length===0 && !showLoading && apiQuery)
                        ? <p className='wrapper'>No results.</p>
                        : null}

                {/* // when search button has not been pressed, don't do anything
                        // if search button is pressed
                            // and if on first page of results, and there are no results from api call, and it is not loading and apiquery is not an empty string , then show no results */}
                        
            {

                // apiQuery && !newSearch
                //     ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                //     : <p>Please input your desired search parameters.</p>

                
                // !newSearch 
                //     ? apiQuery
                //         ? <p>new search is false and apiquery is true</p>
                //         : <p>new search is false and apiquery is false</p>
                //     : apiQuery
                //         ? <p>new search is true and apiquery is true</p>
                //         : <p>new search is true and apiquery is false</p>

                //this one
                // (!newSearch && !showLoading)
                //     ? apiQuery
                //         ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                //         : null
                //     : apiQuery 
                //         ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                //         : <p>Please input your desired search parameters.</p>

                    
                // when newSearch is false and apiquery is not empty (true)
                    // display changepage
                // when newSearch is true and apiquery is empty (false), display message 
                // when newSearch is true and apiquery is not empty(true), display changepage

                // (numResults === 1 && publications.length===0 && !showLoading && apiQuery)
                // if on first page of results, and there are no results from api call, and it is not loading and apiquery is not an empty string 

                // apiQuery 
                //     ? !newSearch 
                //         ? <p>apiquery true and new search false</p>
                //         :<p>apiquery true and new search true</p>
                //     : !newSearch 
                //         ? <p>apiquery false and new search false</p>
                //         : <p>apiquery false and new search true</p>

                // (apiQuery && !showLoading && !newSearch)
                //     ? !newSearch 
                //         ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                //         : <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                //     : !newSearch 
                //         ? null
                //         : <p>Please input your desired search parameters.</p>

                //when apiquery is true, showloading is false, and newsearch is false 

                // when apiquery is not an empty string(true), and newSearch is false, display buttons
                // when api query is nto an empty string(false) and new search is true, display buttons

                // when api query is an empty string (false) and new search is false, null
                // when apiquery is an empty string (false) and new search is true, show message


                !showLoading
                    ? apiQuery
                        ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
                        : !newSearch
                            ?null
                            :<p className='wrapper'>Please input your desired search parameters.</p>
                    : null

            // !newSearch 
            //     ? null
            //     : (numResults === 1 && publications.length===0)
            //         ? showLoading
            //             ? null
            //             : <p className='wrapper'>No results. Please adjust your search parameters.</p>
            //         : apiQuery
            //             ? <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
            //             : <p className='wrapper'>Please enter your desired search paramters.</p>      
                    
            }
      </section>
    )
};

export default SearchPage;