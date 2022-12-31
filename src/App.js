// import styling
import logo from './assets/logo.png';
import './App.scss';

// import Components
import SearchPage from './Components/SearchPage'
import FavouritePage from './Components/FavouritePage';
import SavedPage from './Components/SavedPage'
import Error404 from './Components/Error404';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';

// config
import firebaseConfig from './Components/Firebase';

//import npm modules
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { getDatabase, ref, onValue, push, remove, get, child} from 'firebase/database';
import { Link, Routes, Route, useNavigate, useParams} from 'react-router-dom';

export const MainContext = createContext();

//TODOS
//fix link routing when pge refreshes (useparams?)
//remove firebase guest info when window is closed (beforeunload)
//mobile styling (and fix uneven box and tab)
//custom hooks to clean up App.js


const Main = () => {

  const [ publications, setPublications ] = useState([]);
  const [ apiQuery, setApiQuery ] = useState('');
  const [ numResults, setNumResults] = useState(1);
  const [ newSearch, setNewSearch ] = useState(false);
  const [ showLoading, setShowLoading ] = useState(false);
  const [ favList, setFavList ] = useState([]);
  const [ savedList, setSavedList ] = useState([]);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ accountDetails, setAccountDetails ] = useState({username: '', password: ''}); //put useParams as username

  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  useEffect(() => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/${accountDetails.username}`);
    const childRef = ref(database, `/${accountDetails.username}/account`);
    
    if (accountDetails.username && accountDetails.username!== 'guest') {
      //check if username and password are already stored in account details in firebase, if not, add it, if so, don't add it
      get(child(databaseRef, 'account')).then((snapshot) => {
        if (!snapshot.exists()) {
            push(childRef, accountDetails);
        }
      }).catch((error) => {
        console.log(error);
        alert('Oh no! Something went wrong!');
      });

    // make sure loggedIn state matches with accountDetails state on page refresh
      setLoggedIn(true);
    } 

  }, [accountDetails])

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
  }

  // save number of results in a stateful variable to be used in API call when user clicks next/previous page
  const handleResultPages = (nextPage) => {
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
        
        const favListDoiArray = [];
        favList.forEach((favItem) => {
          favListDoiArray.push(favItem['name']['doi'])
        });

        const savedListDoiArray = [];
        savedList.forEach((savedItem) => {
          savedListDoiArray.push(savedItem['name']['doi'])
        });

        res.data.records.forEach((object) => {
          if (favListDoiArray.includes(object.doi) && savedListDoiArray.includes(object.doi)) {
            modifiedApiData.push({...object, favStatus: true, savedStatus: true});
          } else if (!favListDoiArray.includes(object.doi) && !savedListDoiArray.includes(object.doi)) {
            modifiedApiData.push({...object, favStatus: false, savedStatus: false});
          } else if (favListDoiArray.includes(object.doi) && !savedListDoiArray.includes(object.doi)) {
            modifiedApiData.push({...object, favStatus: true, savedStatus: false});
          } else if (!favListDoiArray.includes(object.doi) && savedListDoiArray.includes(object.doi)) {
            modifiedApiData.push({...object, favStatus: false, savedStatus: true});
          }
        })
        setPublications(modifiedApiData);
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

  // get data from firebase for favourites and saved lists
  useEffect(() => {
    getFirebaseData('favourites');
    getFirebaseData('saved');
  }, [accountDetails.username]);

  const getFirebaseData = (location) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/${accountDetails.username}/${location}`);
    onValue(databaseRef, (response) => {
      const newState = [];
      const data = response.val();
      for (let key in data) {
        newState.push({ key: key, name: data[key]});
      };
      if (location === 'favourites') {
        setFavList(newState);
      } else if (location === 'saved') {
        setSavedList(newState);
      }
    });
  }
  
  // add/remove items from firebase based on button click
  const handleLikeOrSave = (location, publication) => {
    const firebaseDoiArray = [];
    const doiAndKey = {};

    if (location === 'favourites') {
      // loop through each item in firebase and put their doi in favItemDoi, and put their doi and key into the doiAndKey object
      favList.forEach((favItem) => {
        firebaseDoiArray.push(favItem.name.doi);
        doiAndKey[favItem.name.doi] = favItem.key
      });
    } else if (location === 'saved') {
      savedList.forEach((savedItem) => {
        firebaseDoiArray.push(savedItem.name.doi);
        doiAndKey[savedItem.name.doi] = savedItem.key
      });
    }
      // if the item is already in firebase, remove it
      if (firebaseDoiArray.includes(publication.doi)) {
            let removalKey = ''
            // grab the firebase key from the doiAndKey object and pass it to the remove item function
            for (let key in doiAndKey) {
              if (key === publication.doi) {
                removalKey = doiAndKey[key];
              }
            }
            removeFromFirebase(location, removalKey);

      // if the item is not already in firebase, add it
      } else if (!firebaseDoiArray.includes(publication.doi)) {
            addToFirebase(location, publication);
      }

  };

  // remove item from firebase
  const removeFromFirebase = (location, removalKey) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/${accountDetails.username}/${location}/${removalKey}`);
    remove(databaseRef);
  }

  // add item to firebase
  const addToFirebase = (location, publication) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/${accountDetails.username}/${location}`);
    push(databaseRef, publication);
  }

  //********************************
  // FIREBASE
  //********************************

  const handleHomeNavigation = () => {
    if (accountDetails.username === 'guest') {
      setAccountDetails({username:'', password:''});
      navigate('/');
    } else if (accountDetails.username) {
      navigate(`/${accountDetails.username}`);
    }
  }

  const context = {
    accountDetails:accountDetails,
    setAccountDetails:setAccountDetails,
    favList:favList,
    handleLikeOrSave:handleLikeOrSave,
    savedList:savedList,
    getQueryParams:getQueryParams,
    publications:publications,
    handleResultPages:handleResultPages,
    setNewSearch:setNewSearch,
    newSearch:newSearch, 
    numResults:numResults, 
    showLoading:showLoading, 
    apiQuery:apiQuery,
    }


  return (
    <>


    <main>
      <header className='wrapper'>
        {
          loggedIn
            ?<button className='loginButton smallFont' onClick={() => {setLoggedIn(false); setAccountDetails({username:'', password:''}); navigate('/');}}>Log Out</button>
            :<button className='loginButton smallFont' onClick={() => {navigate('/login')}} >Log In / Sign Up</button>
        }

        <button className='h1Container' onClick={() => handleHomeNavigation()}>
          <div className='logoContainer'>
            <img src={logo} alt='illustration of three test tubes' />
          </div>
          <h1>SciLib</h1>
        </button>
        {
          accountDetails.username
            ? accountDetails.username !== 'guest'
              ?<div className='welcomeMessage'><h2>Welcome {accountDetails.username}!</h2><p>What would you like to read about today?</p></div>
              :<div className='guestMessage'>
                <p>Welcome! You are using a guest account.</p>
                <p> To get started, simply select a subject of interest from the dropdown menu to see recent papers related to that subject. To find a specific paper, try the Advanced Search option.</p>
                <p>To save your papers for future sessions, please <Link className='account' to='/login'>Log In / Sign Up.</Link></p></div>
            :null
        }
      </header>

      <section className='wrapper'>


        {
          accountDetails.username
            ? <>
                <div className='pageSelection'>
                  <Link className="page search" to={`/${accountDetails.username}`}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <h3>Search</h3>
                  </Link> 
                  <Link className="page favourites" to={`/${accountDetails.username}/favourites`}>
                    <i className="fa-solid fa-heart"></i>
                    <h3>Favourites (
                        {
                          favList.length >= 0
                            ? (favList.length)
                            : null
                        }
                      )</h3>
                  </Link>
                  <Link className="page saved" to={`/${accountDetails.username}/saved`}>
                    <i className='fa-solid fa-bookmark'></i>
                    <h3>Saved (
                      {
                          savedList.length >= 0
                            ? (savedList.length)
                            : null
                        }
                      )</h3>
                  </Link>
                </div>
              </>
            : null
        }
        
      </section>
    
    <MainContext.Provider value={context} >
      <Routes>
        <Route path='/' element={ <LandingPage setAccountDetails={setAccountDetails} /> }></Route>
        <Route path='/login' element={ <Login accountDetails={accountDetails} setAccountDetails={setAccountDetails} setLoggedIn={setLoggedIn}/> }></Route>
        {/* <Route path={`/${accountDetails.username}`} element={ <SearchPage /> } />
        <Route path={`/${accountDetails.username}/favourites`} element={ <FavouritePage /> } />
        <Route path={`/${accountDetails.username}/saved`} element={ <SavedPage /> } /> */}
        <Route path=':paramsUsername' element={ <SearchPage /> } />
        <Route path={`/:paramsUsername/favourites`} element={ <FavouritePage /> } />
        <Route path={`/:paramsUsername/saved`} element={ <SavedPage /> } />
        <Route path='*' element={ <Error404 /> } />
      </Routes>
      </MainContext.Provider>
    </main>

    <footer className='smallFont'>Created by <a href='https://www.tinalu.ca/' target="_blank" rel="noreferrer">Tina Lu</a> at <a href='https://junocollege.com/' target="_blank" rel="noreferrer">Juno College</a></footer>
    </>
  );
}

export default Main;
