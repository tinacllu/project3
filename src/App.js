// import styling
import './App.scss';
import logo from './assets/logo.png';

// import Components
import Main from './Components/Main';
import Login from './Components/Login';

// import npm modules
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
    <header className='wrapper'>
        <Link className='h1Container' to='/'>
          <div className='logoContainer'>
            <img src={logo} alt='illustration of three test tubes' />
          </div>
          <h1>SciLib</h1>
        </Link>
        
        <div className="about">
          <p>Welcome to SciLib - a library to browse and save your favourite scientific literature from Springer Open Access! To get started, simply select a subject of interest from the dropdown menu to see recent papers related to that subject. To find a specific paper, try the Advanced Search option. </p>
          <p>To curate and save your personal list of papers for future sessions:</p>
          <Link className='account' to='/login'>Log In / Create an Account</Link>
          <p>No account, no problem!</p>
          <Link className='guest account'>Continue as Guest</Link> 
          <p>*Note: Papers saved in a guest account will not be saved for future sessions.</p>
          <p>Happy reading!</p>
        </div>
        
    </header>
    <Main />
    <footer>Created by <a href='https://www.tinalu.ca/' target="_blank" rel="noreferrer">Tina Lu</a> at <a href='https://junocollege.com/' target="_blank" rel="noreferrer">Juno College</a></footer>
    </>
  );
}

export default App;
