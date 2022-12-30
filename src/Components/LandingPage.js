import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = ( { setAccountDetails }) => {
  return (
    <div className="landingPage wrapper">
      <div className="about">
        <p>Welcome to SciLib - a library to browse and save your favourite scientific literature from Springer Open Access! To get started, log in to your account then simply select a subject of interest from the dropdown menu to see recent papers related to that subject. To find a specific paper, try the Advanced Search option.</p>
      </div>

      <div className="accountNav">
        <div className="accountLink">
          <p>To curate and save your personal list of papers for future sessions:</p>
          <Link className='account' to='/login'>Log In / Create an Account</Link>
        </div>

        <div className="accountLink">
          <p>No account, no problem!</p>
          <Link className='guest account' to='/guest/' onClick={() => {setAccountDetails({username: 'guest', password: 'guest123'})}}>Continue as Guest</Link>
          <p className='smallFont'>*Note: Papers saved in a guest account will not be saved for future sessions.</p>
        </div>
      </div>

      <p>Happy reading!</p>
        
    </div>
  )
}

export default LandingPage