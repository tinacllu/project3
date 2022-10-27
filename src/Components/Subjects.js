const Subjects = () => {
    return(
        <form action="#">
            <label for="subjects" hidden>Subjects</label>
            <select name="subjects" id="subjects">
                <option value="biology">Biology</option>
                <option value="math">Mathematics</option>
                <option value="physics">Physics</option>
            </select>
            <button type="submit">Search</button>
        </form>
    )
};

export default Subjects;