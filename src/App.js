// import styling
import './App.css';
import logo from './assets/logo.png';

// import Components
import SearchForm from './Components/SearchForm';
import Papers from './Components/Papers';
import ChangePage from './Components/ChangePage';
import SearchPage from './Components/SearchPage';
import FavouritePage from './Components/FavouritePage';
import SavedPage from './Components/SavedPage'

// config
import firebaseConfig from './Components/Firebase';

//import npm modules
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getDatabase, ref, onValue, push, remove} from 'firebase/database';
import { Link, Routes, Route, Outlet } from 'react-router-dom';

function App() {
  const [ publications, setPublications ] = useState([]);
  // const [ queryParams, setQueryParams ] = useState('');
  const [ apiQuery, setApiQuery ] = useState('');
  // const [ advancedParams, setAdvancedParams ] = useState({});
  const [ numResults, setNumResults] = useState(1);
  const [ newSearch, setNewSearch ] = useState(false);
  const [ showLoading, setShowLoading ] = useState(false);
  const [ landingPage, setLandingPage ] = useState(true);
  const [ loginCreds, setLoginCreds ] = useState(['demo', 'demo123']);
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
    const databaseRef = ref(database, `/${[loginCreds[0]]}/favourites`);

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
    console.log(apiQuery);
   
    if (apiQuery) {
      setShowLoading(true);
      axios({
        url: 'http://api.springernature.com/openaccess/json',
        params: {
          api_key:'d358a2b18c4f7efb5bf611352385eeaf',
          // api_key:'b1d9463d9bc800cb5d5134b95771983c',
          // q:`(subject:${queryParams} AND language:'en')`,
          // q:`(title: 'congenital' AND language:'en' AND year:'2018' AND name:'li' AND doi:'10.1186/s12902-018-0307-6')`,
          q: `${apiQuery}`,
          p: 10,
          s: numResults,
        },
      }).then((res) => {
          console.log(res);
          console.log(res.data.records);
          setPublications(res.data.records);
          setShowLoading(false);
      }).catch((error) => {
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
      for (let key in data[loginCreds[0]]) {
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
        <div className='h1Container'>
          <div className='logoContainer'>
            <img src={logo} alt='' />
          </div>
          <h1>SciLib</h1>
        </div>
        
        <p>Welcome to SciLib - a library to browse and save your favourite scientific literature! For casual browsing, simply select a subject of interest from the dropdown menu to see recent papers related to that subject. For more specific searches, use the Advanced Search option. </p>
        {/* <p>If you would like to curate a personal favourites list, please login or sign up.
        </p> */}
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
          {/* <div className="page searchPage" >
            <i className="fa-solid fa-magnifying-glass"></i>
            <h3>Search</h3>
          </div> 
          <div className="page favouritePage">
            <i className="fa-solid fa-heart"></i>
            <h3>Favourites</h3>
          </div>
          <div className="page savedPage">
            <i className='fa-solid fa-bookmark'></i>
            <h3>Saved</h3>
          </div> */}
        </div>
      </section>

      <Routes>
        <Route path='/' element={<SearchPage 
          getQueryParams={getQueryParams} 
          setLandingPage={setLandingPage} 
          publications={publications} 
          handleLike={handleLike} 
          handleResultPages={handleResultPages} 
          newSearch={newSearch} 
          numResults={numResults} 
          showLoading={showLoading} 
          landingPage={landingPage}
          apiQuery={apiQuery}/>} />
        <Route path='/favourites' element={<FavouritePage />} />
        <Route path='/saved' element={<SavedPage/>} />
      </Routes>

      {/* <SearchPage getQueryParams={getQueryParams} setLandingPage={setLandingPage} publications={publications} handleLike={handleLike} handleResultPages={handleResultPages} newSearch={newSearch} numResults={numResults} showLoading={showLoading} landingPage={landingPage}/> */}
      {/* <section className='search wrapper'>
        <SearchForm getQueryParams={getQueryParams} setLandingPage={setLandingPage}/> 
        {
          showLoading
            ? <p>Loading</p>
            : <Papers publications={publications} handleLike={handleLike}/>
        }
        
        {
          landingPage 
            ? null
            : (numResults === 1 && publications.length===0)
              ? showLoading
                  ? null
                  : <p>No results</p>
              : <ChangePage handleResultPages={handleResultPages} publications={publications} newSearch={newSearch} numResults={numResults} />
        }
      </section> */}
    </main>
    <footer>Created by Tina Lu at <a href='https://junocollege.com/'>Juno College</a></footer>
    </>
  );
}

export default App;
