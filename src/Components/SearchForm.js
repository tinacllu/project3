import { useState, useEffect, useContext } from 'react';
import { MainContext } from './Main';

const SearchForm = () => {
    const { getQueryParams, setNewSearch } = useContext(MainContext);

    const [ showForm, setShowForm ] = useState(false);
    const [ userInput, setUserInput ] = useState({subject: '', title: '', year: '', name: '', doi: ''});
    const [ subject, setSubject ] = useState('placeholder');
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
        const inputStorage = {subject: subject, title: title, year: year, name: name, doi: doi};
        setUserInput(inputStorage);
        
    }, [subject, title, name, year, doi]);

    return(
        <section className='searchForms'>
        {!showForm
            ? (
                <>
                
                <form className='basicSearch' onSubmit={(event) => {getQueryParams(event, userInput)}}>
                    <div className='searchParam'>
                        <label htmlFor='subjects'>Select your subject of interest:</label>
                        <select onChange={(e) => setSubject(e.target.value)} name='subjects' id='subjects' value={subject}>
                            <option value='placeholder' disabled>Select a subject</option>
                            <option value='Anatomy'>Anatomy</option>
                            <option value='Biomedicine'>Biomedicine</option>
                            <option value='Bioinformatics'>Bioinformatics</option>
                            <option value='Chemistry'>Chemistry</option>
                            <option value='Ecology'>Ecology</option>
                            <option value='Environment'>Environment</option>
                            <option value='Immunology'>Immunology</option>
                            <option value='Mathematics'>Mathematics</option>
                            <option value='Microbiology'>Microbiology</option>
                            <option value='Neurology'>Neurology</option>
                            <option value='Oncology'>Oncology</option>
                            <option value='Pathology'>Pathology</option>
                            <option value='Pharmacy'>Pharmacy</option>
                            <option value='Physics'>Physics</option>
                            <option value='Physiology'>Physiology</option>
                            <option value='Psychology'>Psychology</option>
                            <option value='Virology'>Virology</option>
                        </select> 
                    </div>
                    <button type='submit'>Search</button>
                </form>

                <button className='toggleSearch' onClick={() => {setShowForm(!showForm); setSubject('placeholder'); setNewSearch(false)}}>
                    <p>Show Advanced Search</p>
                    <i className='fa-solid fa-chevron-down'></i>
                </button>
                </>
            )
            : (
                <>
                <button className='toggleSearch' onClick={() => {setShowForm(!showForm); resetAdvancedParams(); setNewSearch(false)}}>
                    <p>Show Basic Search</p>
                    <i className='fa-solid fa-chevron-up'></i>
                </button>
                <form className='advancedSearch' onSubmit={(event) => {getQueryParams(event, userInput)}}>
                    <div className='searchParam'>
                       <label htmlFor='title'>Title:</label>
                        <input type='text' id='title' placeholder='Title' onChange={(e) => {setTitle(e.target.value)}}></input> 
                    </div>
                    <div className='searchParam'>
                        <label htmlFor='year'>Publication Year:</label>
                        <input type='text' id='year' placeholder='Year' onChange={(e) => {setYear(e.target.value)}}></input>
                    </div>
                    <div className='searchParam'>
                        <label htmlFor='author'>Author:</label>
                        <input type='text' id='author' placeholder='Author' onChange={(e) => {setName(e.target.value)}}></input>
                    </div>
                    <div className='searchParam'>
                        <label htmlFor='doi'>DOI:</label>
                        <input type='text' id='doi' placeholder='DOI' onChange={(e) => {setDoi(e.target.value)}}></input>
                    </div>
                    
                    <button type='submit'>Search</button>
                </form>
                </>
            )}
        
        </section>
    )
};

export default SearchForm;