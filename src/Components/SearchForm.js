import { useState } from 'react';

const SearchForm = (props) => {

    const [ userChoice, setUserChoice ] = useState('placeholder');
    const handleUserChoice = (e) => {
        setUserChoice(e.target.value);
    }

    return(
        <form onSubmit={(event) => props.getQueryParams(event, userChoice)}>
            <label htmlFor="subjects" hidden>Subjects</label>
            <select onChange={handleUserChoice} name="subjects" id="subjects" value={userChoice}>
                <option value="placeholder" disabled>Select a subject</option>
                <option value="Biomedicine">Biomedicine</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Earth Sciences">Earth Sciences</option>
                <option value="Environment">Environment</option>
                <option value="Immunology">Immunology</option>
                <option value="Life%Sciences">Life Sciences</option>
                {/* biology, life sciences has no results */}
                <option value="Materials Science">Materials Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Medicine & Public Health">Medicine & Public Health</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Physics">Physics</option>
                <option value="Psychology">Psychology</option>
            </select>
            <button type="submit">Search</button>
        </form>
    )
};

export default SearchForm;