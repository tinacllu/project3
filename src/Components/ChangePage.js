import { useContext } from "react";
import { MainContext } from '../App';

const ChangePage = () => {

    const { handleResultPages, publications, numResults } = useContext(MainContext);

    return(
        <div className='pageButtons'>
            {
                numResults > 1 
                    ?(
                        <button className='prev' onClick={() => handleResultPages(false)}>
                            Prev<span className='long'>ious Page</span>
                        </button>
                    )
                    :null
            }

            {
                (publications.length < 10)
                    ? numResults === 1
                        ? null
                        : <p className='end'>End of results</p>
                    : (
                        <button className='next' onClick={() => handleResultPages(true)}>
                            Next<span className='long'> Page</span>
                        </button>
                    )
            }
        </div>
    )
}

export default ChangePage;