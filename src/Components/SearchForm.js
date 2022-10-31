import { useState } from 'react';

const SearchForm = ( {getQueryParams, setShowLoading, setLandingPage} ) => {

    const [ userChoice, setUserChoice ] = useState('placeholder');
    const handleUserChoice = (e) => {
        setUserChoice(e.target.value);
    }

    return(
        <form onSubmit={(event) => {getQueryParams(event, userChoice); setShowLoading(true); setLandingPage(false)}}>
            <label htmlFor="subjects" hidden>Subjects</label>
            <select onChange={handleUserChoice} name="subjects" id="subjects" value={userChoice}>
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
    )
};

export default SearchForm;