import { useEffect } from "react";
import { useState } from "react";

const Authors = ( {publication} ) => {
    const [ authorList, setAuthorList ] = useState([]);

    useEffect(() => {
        if (publication.creators) {
            const authorArray = publication.creators.map((author) => {     
                const authorNameArray = author.creator.split(', ');
                const eachAuthor = `${authorNameArray[1]} ${authorNameArray[0]}`
                return eachAuthor;
            });
            setAuthorList(authorArray.join(', '));
        }
    }, [publication])

    return(
        <>
            <p><span className='bold'>Authors: </span>
                {authorList}
            </p>
        </>
        
    )
}

export default Authors;
