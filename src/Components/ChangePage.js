const ChangePage = ( {handleResultPages, publications, newSearch, numResults} ) => {

    return(
        <div className='pageButtons'>
            {
                numResults > 1 
                    ?(
                        <button className="prev" onClick={() => handleResultPages(false)}>
                            Previous Page
                        </button>
                    )
                    :null
            }

            {
                (publications.length < 10)
                    ? numResults === 1
                        ? null
                        : <p className="end">End of results</p>
                    : (
                        <button className="next" onClick={() => handleResultPages(true)}>
                            Next Page
                        </button>
                    )
            }
        </div>
    )
}

export default ChangePage;