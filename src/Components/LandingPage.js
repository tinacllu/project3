import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="about">
        <p>Welcome to SciLib - a library to browse and save your favourite scientific literature from Springer Open Access! To get started, simply select a subject of interest from the dropdown menu to see recent papers related to that subject. To find a specific paper, try the Advanced Search option. </p>
        <p>To curate and save your personal list of papers for future sessions:</p>
        <Link className='account' to='/login'>Log In / Create an Account</Link>
        <p>No account, no problem!</p>
        <Link className='guest account' to='/guest/'>Continue as Guest</Link> 
        <p>*Note: Papers saved in a guest account will not be saved for future sessions.</p>
        <p>Happy reading!</p>
    </div>
  )
}

export default LandingPage