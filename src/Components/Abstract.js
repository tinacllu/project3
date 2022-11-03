const Abstract = (props) => {
    return(
        <div className='abstractContainer'>
            {
                !props.publication.abstract.h1
                    ? (<div className='abstractText'>
                            <h3>Abstract not available</h3>
                        </div>)
                    : typeof props.publication.abstract.p === 'object'
                        ? (<div className='abstractText'>
                            <h3>Abstract</h3>
                            {
                                props.publication.abstract.p.map((line)=> {
                                    return(
                                        <p>{line}</p>
                                    )
                                })
                            }
                        </div>)
                        : (<div className='abstractText'>
                            <h3>Abstract</h3>
                            <p>{props.publication.abstract.p}</p>
                        </div>)
            }
            {
                !props.publication.url[0].value
                    ? <p>Link to full text not available. Please Google it using the DOI: {props.publication.doi}</p>
                    : (<a className='button' href={props.publication.url[0].value} target="_blank" rel="noreferrer">
                        <p>Full Text</p>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>) 
            }
        </div>
    )
}

export default Abstract;