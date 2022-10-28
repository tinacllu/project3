import { useState } from 'react';


const ChangePage = ( {handleResultPages} ) => {
    const [ number, setNumber ] = useState(11)

    return(
        <>
            <button onClick={() => {setNumber(number - 10); handleResultPages(number)}}>
                Previous Page
                {number}
            </button>
            <button onClick={() => {setNumber(number + 10); handleResultPages(number)}}>
                Next Page
                {number}
            </button>
            
            {/* disable button if no more results? */}
        </>
        
    )
}

export default ChangePage;