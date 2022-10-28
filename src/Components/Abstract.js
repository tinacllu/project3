const Abstract = (props) => {
    console.log(props.publication)
    console.log(props.publication.url[0].value)
    return(
        <div>
            {/* <p>{props.abstract[0].h1}</p> */}
            {/* <p>{props.abstract.p}</p> */}
            <a href={props.publication.url[0].value}>Full Text</a> 
            {/* ternary for if no link, show link to full text not available */}
        </div>
    )
}

export default Abstract;