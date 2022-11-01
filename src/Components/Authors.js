const Authors = (props) => {
    const authorArray = props.publication.creators.map((author) => {     
        const authorNameArray = author.creator.split(', ');
        const eachAuthor = `${authorNameArray[1]} ${authorNameArray[0]}`
        return eachAuthor;
    })

    return(
        <>
            <p><span className='bold'>Authors:</span>
                {
                    ` ${authorArray.join(', ')}`
                }  
            </p>
        </>
        
    )
}

export default Authors;
