import { useState, useEffect } from 'react';

const ChangePage = ( {handleResultPages, publications, searched} ) => {
    const [ number, setNumber ] = useState(11);

    useEffect(() => {
        if (searched) {
            setNumber(11);
        }
    }, [searched])
    return(
        <>
            {
                number > 11 
                    ?(
                        <button onClick={() => {setNumber(number - 10); handleResultPages(number)}}>
                            Previous Page
                            {number}
                        </button>
                    )
                    :null
            }

            {
                publications.length < 10
                    ? <p>End of results</p>
                    : (
                        <button onClick={() => {setNumber(number + 10); handleResultPages(number)}}>
                            Next Page
                            {number}
                        </button>
                    )

            }
        </>
    )
}

export default ChangePage;