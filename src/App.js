// import styling
import './App.scss';
import logo from './assets/logo.png';

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
import { getDatabase, ref, onValue, push, remove} from 'firebase/database';
import { Link, Routes, Route } from 'react-router-dom';
// import { Value } from 'sass';

function App() {
  const [ publications, setPublications ] = useState([]);
  const [ apiQuery, setApiQuery ] = useState('');
  const [ numResults, setNumResults] = useState(1);
  const [ newSearch, setNewSearch ] = useState(false);
  const [ showLoading, setShowLoading ] = useState(false);
  const [ favList, setFavList ] = useState([]);
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

  // call the API based on user input
  useEffect (() => {
    if (apiQuery) {
      setShowLoading(true);
      axios({
        url: 'https://api.springernature.com/openaccess/json',
        params: {
          api_key:'d358a2b18c4f7efb5bf611352385eeaf',
          // api_key:'b1d9463d9bc800cb5d5134b95771983c',
          q: `(${apiQuery} AND language:"en" )`, 
          p: 10,
          s: numResults,
        },
      }).then((res) => {
        const modifiedApiData = [];
        res.data.records.forEach((object) => {
          // console.log(object);
          console.log(object.doi);
        })


        setPublications(res.data.records);
        setShowLoading(false);
      }).catch(() => {
        alert('Oh no - something went wrong! Please try again later :( ');
        setShowLoading(true);
      });
    } 
  }, [apiQuery, numResults]);

  //********************************
  // FIREBASE
  //********************************
  // get data from firebase
  useEffect(() => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/demo/favourites`);
    onValue(databaseRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({ key: key, name: data[key]});
      };
      setFavList(newState);
    })
  }, [])
  
  // add/remove items from firebase based on button click
  const handleLike = (likeStatus, publication) => {
    const favItemDoi = [];
    const doiAndKey = {};
    
    // loop through each item in firebase and put their doi in favItemDoi, and put their doi and key into the doiAndKey object
    favList.forEach((favItem) => {
      favItemDoi.push(favItem.name.doi);
      doiAndKey[favItem.name.doi] = favItem.key
    });

    // if the item is already in firebase, remove it
    if (favItemDoi.includes(publication.doi)) {
          let removalKey = ''
          // grab the firebase key from the doiAndKey object and pass it to the remove item function
          for (let key in doiAndKey) {
            if (key === publication.doi) {
              removalKey = doiAndKey[key];
            }
          }
          console.log(removalKey);
          removeFromFirebase(removalKey);

    // if the item is not already in firebase, add it
    } else if (!favItemDoi.includes(publication.doi)) {
          addToFirebase(publication);
    } else {
      console.log('send help')
    }
  }

  // remove item from firebase
  const removeFromFirebase = (removalKey) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/demo/favourites/${removalKey}`);
    remove(databaseRef);
    console.log("removed!");
  }

  // add item to firebase
  const addToFirebase = (publication) => {
    console.log("Added!");
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/demo/favourites`);
    const firebaseObj = push(databaseRef, publication);
    console.log(firebaseObj.key);
  }

  //********************************
  // FIREBASE
  //********************************

  return (
    <>
    <main>
      <header className='wrapper'>
        <Link className='h1Container' to='/'>
          <div className='logoContainer'>
            <img src={logo} alt='illustration of three test tubes' />
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
          favList={favList}
          setNewSearch={setNewSearch}
          newSearch={newSearch} 
          numResults={numResults} 
          showLoading={showLoading} 
          apiQuery={apiQuery}/> } />
        <Route path='/favourites' element={ <FavouritePage 
          favList={favList}
          handleLike={handleLike} /> } />
        <Route path='/saved' element={ <SavedPage /> } />
        <Route path='*' element={ <Error404 /> } />
      </Routes>
    </main>
    <footer>Created by <a href='https://www.tinalu.ca/' target="_blank" rel="noreferrer">Tina Lu</a> at <a href='https://junocollege.com/' target="_blank" rel="noreferrer">Juno College</a></footer>
    </>
  );
}

export default App;
