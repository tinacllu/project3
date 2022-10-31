import { useState, useEffect } from 'react';

const AdvancedSearchForm = ( {getAdvancedParams, setShowLoading, setLandingPage}) => {
    const [ showForm, setShowForm ] = useState(false);
    const [ userInput, setUserInput ] = useState({title: "", year: "", author: "", doi: ""});
    const [ title, setTitle ] = useState("");
    const [ author, setAuthor ] = useState("");
    const [ year, setYear ] = useState("");
    const [ doi, setDoi ] = useState("");

    useEffect(() => {
        const inputStorage = {title: title, year: year, author: author, doi: doi};
        setUserInput(inputStorage);
    }, [title, author, year, doi]);

    return(
        <>
            <button onClick={() => setShowForm(!showForm)}>Advanced Search</button>
            {
                !showForm
                    ? null
                    : (
                        <form onSubmit={(event) => {getAdvancedParams(event, userInput); setShowLoading(true); setLandingPage(false)}}>
                            <label htmlFor="title" hidden>title</label>
                            <input type="text" id="title" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}></input>
                            <label htmlFor="year" hidden>Publication Year</label>
                            <input type="text" id="year" placeholder="Year" onChange={(e) => {setYear(e.target.value)}}></input>
                            <label htmlFor="author" hidden>Author</label>
                            <input type="text" id="author" placeholder="Author" onChange={(e) => {setAuthor(e.target.value)}}></input>
                            <label htmlFor="doi" hidden>DOI</label>
                            <input type="text" id="doi" placeholder="DOI" onChange={(e) => {setDoi(e.target.value)}}></input>
                            <button type="submit">Search</button>
                        </form>
                    )
            } 
        </>
    )
};

export default AdvancedSearchForm;