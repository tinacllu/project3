// import styling
import './App.scss';
import logo from './assets/logoAltEdit.png';

// import Components
import SearchPage from './Components/SearchPage';
import FavouritePage from './Components/FavouritePage';
import SavedPage from './Components/SavedPage'
import Error404 from './Components/Error404';

// config
import firebaseConfig from './Components/Firebase';

//import npm modules
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getDatabase, ref, onValue, push} from 'firebase/database';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  const [ publications, setPublications ] = useState([]);
  const [ apiQuery, setApiQuery ] = useState('');
  const [ numResults, setNumResults] = useState(1);
  const [ newSearch, setNewSearch ] = useState(false);
  const [ showLoading, setShowLoading ] = useState(false);
  // const [ favList, setFavList ] = useState([]);
  // const [ savedList, setSavedList ] = useState([]);

  // save search parameters inputted by user into a stateful variable
  const getQueryParams = (event, userInput) => {
    event.preventDefault();
    setNumResults(1);
    setNewSearch(true);
    const newQueryArray = [];
    for (const key in userInput) {
      if (userInput[key] !== '' && userInput[key] !== 'placeholder') {
        newQueryArray.push(`${key}:"${userInput[key]}"`);
      }
    };
    const newQueryString = newQueryArray.join(' AND ');
    setApiQuery(newQueryString);
    // console.log(newQueryString, 'newquerystring')
  }

  // save number of results in a stateful variable to be used in API call when user clicks next/previous page
  const handleResultPages = (nextPage) => {
    // setNumResults(number);
    if (nextPage) {
      setNumResults(numResults + 10)
    } else {
      setNumResults(numResults - 10);
    }
    setNewSearch(false);
  }
  
  const handleLike = (likeStatus, paperDetails) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/demo/favourites`);

    const firebaseObj = push(databaseRef, paperDetails);
    console.log(firebaseObj.key);
    
    if (likeStatus) {
      console.log('like status is true');
    } else {
      // remove(databaseRef, ({id: paperDetails}) )
      console.log('likestaus is false')
    }
    
  }

  // const handleUnLike = () => {
  //   const database = getDatabase(firebaseConfig);
  //   // const databaseRef = ref(database, `/${bookId}`)
  // }

  // call the API based on user input
  useEffect (() => {
    if (apiQuery) {
      setShowLoading(true);
      axios({
        url: 'http://api.springernature.com/openaccess/json',
        params: {
          api_key:'d358a2b18c4f7efb5bf611352385eeaf',
          // api_key:'b1d9463d9bc800cb5d5134b95771983c',
          q: `${apiQuery}`,
          p: 10,
          s: numResults,
        },
      }).then((res) => {
          setPublications(res.data.records);
          setShowLoading(false);
      }).catch(() => {
        alert('Oh no - something went wrong! Please try again later :( ')
      });
    } else {
      console.log('apiQuery is empty', apiQuery)
    }
  }, [apiQuery, numResults]);
// add error handling 


  // get data from firebase
  useEffect (() => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database);
    onValue(databaseRef, (response) => {
      const newFavList = [];
      // const newSavedList = [];
      const data = response.val();
      for (let key in data['demo']) {
        newFavList.push({ key: key, name: data[key]});
      };

      // setFavList(newFavList);
      // setSavedList(newSavedList);
    });
  }, []);

  return (
    <>
    <main>
      <header className='wrapper'>
        <Link className='h1Container' to='/'>
          <div className='logoContainer'>
            <img src={logo} alt='line art of atom' />
          </div>
          <h1>SciLib</h1>
        </Link>
        
        <div className="about">
          <p>Welcome to SciLib - a library to browse and save your favourite scientific literature from Springer Open Access! To get started, simply select a subject of interest from the dropdown menu to see recent papers related to that subject. To find a specific paper, try the Advanced Search option. </p>
          <p>Happy reading!</p>
        </div>
        
      </header>

      <section className='wrapper'>
        <div className='pageSelection'>
          <Link className="page search" to="/">
            <i className="fa-solid fa-magnifying-glass"></i>
            <h3>Search</h3>
          </Link> 
          <Link className="page favourites" to='/favourites'>
            <i className="fa-solid fa-heart"></i>
            <h3>Favourites</h3>
          </Link>
          <Link className="page saved" to='/saved'>
            <i className='fa-solid fa-bookmark'></i>
            <h3>Saved</h3>
          </Link>
        </div>
      </section>

      <Routes>
        <Route path='/' element={ <SearchPage 
          getQueryParams={getQueryParams} 
          publications={publications} 
          handleLike={handleLike} 
          handleResultPages={handleResultPages} 
          setNewSearch={setNewSearch}
          newSearch={newSearch} 
          numResults={numResults} 
          showLoading={showLoading} 
          apiQuery={apiQuery}/> } />
        <Route path='/favourites' element={ <FavouritePage /> } />
        <Route path='/saved' element={ <SavedPage /> } />
        <Route path='*' element={ <Error404 /> } />
      </Routes>
    </main>
    <footer>Created by <a href='https://www.tinalu.ca/'>Tina Lu</a> at <a href='https://junocollege.com/'>Juno College</a></footer>
    </>
  );
}

export default App;
