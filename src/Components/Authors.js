const Authors = (props) => {
    const authorArray = props.publication.creators.map((author) => {     
        const authorNameArray = author.creator.split(', ');
        const eachAuthor = `${authorNameArray[1]} ${authorNameArray[0]}`
        return eachAuthor;
    })

    return(
        <>
            <p>Authors: 
                <span>
                    {
                        ` ${authorArray.join(', ')}`
                    }  
                </span>
            </p>
        </>
        
    )
}

export default Authors;
