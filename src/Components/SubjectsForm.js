import { useState } from 'react';

const SubjectsForm = (props) => {

    const [ userChoice, setUserChoice ] = useState('placeholder');
    const handleUserChoice = (e) => {
        setUserChoice(e.target.value);
    }

    return(
        <form onSubmit={(event) => props.getQueryParams(event, userChoice)}>
            <label htmlFor="subjects" hidden>Subjects</label>
            <select onChange={handleUserChoice} name="subjects" id="subjects" value={userChoice}>
                <option value="placeholder" disabled>Select a subject</option>
                <option value="Biology">Biology</option>
                {/* biology has no results */}
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Immunology">Immunology</option>
            </select>
            <button type="submit">Search</button>
        </form>
    )
};

export default SubjectsForm;