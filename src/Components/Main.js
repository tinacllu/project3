// import Components
import SearchPage from './SearchPage';
import FavouritePage from './FavouritePage';
import SavedPage from './SavedPage'
import Error404 from './Error404';

// config
import firebaseConfig from './Firebase';

//import npm modules
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { getDatabase, ref, onValue, push, remove} from 'firebase/database';
import { Link, Routes, Route } from 'react-router-dom';

export const MainContext = createContext();

const Main = () => {
    
  const [ publications, setPublications ] = useState([]);
  const [ apiQuery, setApiQuery ] = useState('');
  const [ numResults, setNumResults] = useState(1);
  const [ newSearch, setNewSearch ] = useState(false);
  const [ showLoading, setShowLoading ] = useState(false);
  const [ favList, setFavList ] = useState([]);
  const [ savedList, setSavedList ] = useState([]);

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
          } else {
            console.log("there's another condition!")
          }
        })
        setPublications(modifiedApiData);
        setShowLoading(false);
        console.log(publications);
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
  }, []);

  const getFirebaseData = (location) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/demo/${location}`);
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
    const databaseRef = ref(database, `/demo/${location}/${removalKey}`);
    remove(databaseRef);
  }

  // add item to firebase
  const addToFirebase = (location, publication) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/demo/${location}`);
    push(databaseRef, publication);
  }

  //********************************
  // FIREBASE
  //********************************

  const context = {
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
      <section className='wrapper'>
        <div className='pageSelection'>
          <Link className="page search" to="/">
            <i className="fa-solid fa-magnifying-glass"></i>
            <h3>Search</h3>
          </Link> 
          <Link className="page favourites" to='/favourites'>
            <i className="fa-solid fa-heart"></i>
            <h3>Favourites (
                {
                  favList.length - 1>= 0
                    ? (favList.length - 1)
                    : null
                }
              )</h3>
          </Link>
          <Link className="page saved" to='/saved'>
            <i className='fa-solid fa-bookmark'></i>
            <h3>Saved (
              {
                  savedList.length - 1>= 0
                    ? (savedList.length - 1)
                    : null
                }
              )</h3>
          </Link>
        </div>
      </section>
    
    <MainContext.Provider value={context} >
      <Routes>
        <Route path='/' element={ <SearchPage 
          publications={publications} 
          newSearch={newSearch} 
          numResults={numResults} 
          showLoading={showLoading} 
          apiQuery={apiQuery}/> } />
        <Route path='/favourites' element={ <FavouritePage /> } />
        <Route path='/saved' element={ <SavedPage /> } />
        <Route path='*' element={ <Error404 /> } />
      </Routes>
      </MainContext.Provider>
    </main>
    
    </>
  );
}

export default Main;
