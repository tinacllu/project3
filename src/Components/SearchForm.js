import { useState, useEffect } from 'react';

const SearchForm = ( {getQueryParams, setShowLoading, setLandingPage} ) => {

    // const [ userChoice, setUserChoice ] = useState('placeholder');
    // const handleUserChoice = (e) => {
    //     setUserChoice(e.target.value);
    // }

    const [ showForm, setShowForm ] = useState(false);
    const [ userInput, setUserInput ] = useState({subject: '', title: '', year: '', name: '', doi: ''});
    const [ subject, setSubject ] = useState("placeholder");
    const [ title, setTitle ] = useState('');
    const [ name, setName ] = useState('');
    const [ year, setYear ] = useState('');
    const [ doi, setDoi ] = useState('');

    const resetAdvancedParams = () => {
        setTitle('');
        setName('');
        setYear('');
        setDoi('');
    };

    useEffect(() => {
        // if (showForm) {
        //     setSubject("");
        // } else {

        // }
        const inputStorage = {subject: subject, title: title, year: year, name: name, doi: doi};
        setUserInput(inputStorage);
        
    }, [subject, title, name, year, doi]);

    return(
        <>
        {!showForm
            ? (
                <>
                <form onSubmit={(event) => {getQueryParams(event, userInput); setShowLoading(true); setLandingPage(false)}}>
                    <label htmlFor="subjects" hidden>Subjects</label>
                    <select onChange={(e) => setSubject(e.target.value)} name="subjects" id="subjects" value={subject}>
                        <option value="placeholder" disabled>Select a subject</option>
                        <option value="Anatomy">Anatomy</option>
                        <option value="Biomedicine">Biomedicine</option>
                        <option value="Bioinformatics">Bioinformatics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Ecology">Ecology</option>
                        <option value="Environment">Environment</option>
                        <option value="Immunology">Immunology</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Microbiology">Microbiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Oncology">Oncology</option>
                        <option value="Pathology">Pathology</option>
                        <option value="Pharmacy">Pharmacy</option>
                        <option value="Physics">Physics</option>
                        <option value="Physiology">Physiology</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Virology">Virology</option>
                    </select>
                    <button type="submit">Search</button>
                </form>

                <button onClick={() => {setShowForm(!showForm); setSubject('placeholder')}}>
                    <p>Show Advanced Search</p>
                    <i className="fa-solid fa-chevron-down"></i>
                </button>
                </>
            )
            : (
                <>
                <button onClick={() => {setShowForm(!showForm); resetAdvancedParams()}}>
                    <p>Show Basic Search</p>
                    <i className="fa-solid fa-chevron-up"></i>
                </button>
                <form onSubmit={(event) => {getQueryParams(event, userInput); setShowLoading(true); setLandingPage(false)}}>
                    <label htmlFor="title" hidden>title</label>
                    <input type="text" id="title" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}></input>
                    <label htmlFor="year" hidden>Publication Year</label>
                    <input type="text" id="year" placeholder="Year" onChange={(e) => {setYear(e.target.value)}}></input>
                    <label htmlFor="author" hidden>Author</label>
                    <input type="text" id="author" placeholder="Author" onChange={(e) => {setName(e.target.value)}}></input>
                    <label htmlFor="doi" hidden>DOI</label>
                    <input type="text" id="doi" placeholder="DOI" onChange={(e) => {setDoi(e.target.value)}}></input>
                    <button type="submit">Search</button>
                </form>
                </>
            )}
        
        </>
    )
};

export default SearchForm;