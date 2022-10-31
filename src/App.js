// import styling
import './styles/styles';
import './App.css';

// import Components
import SearchForm from './Components/SearchForm';
import Papers from './Components/Papers';
import ChangePage from './Components/ChangePage';
import AdvancedSearchForm from './Components/AdvancedSearchForm';

// config
import firebaseConfig from './Components/Firebase';

//import npm modules
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getDatabase, ref, onValue, push, remove} from 'firebase/database';

function App() {
  const [ publications, setPublications ] = useState([]);
  const [ queryParams, setQueryParams ] = useState('');
  const [ advancedParams, setAdvancedParams ] = useState({});
  const [ numResults, setNumResults] = useState(1);
  const [ searched, setSearched ] = useState(false);
  const [ showLoading, setShowLoading ] = useState(false);
  const [ landingPage, setLandingPage ] = useState(true);
  const [ loginCreds, setLoginCreds ] = useState(['demo', 'demo123']);
  const [ favList, setFavList ] = useState([]);
  // const [ savedList, setSavedList ] = useState([]);

  // save search parameters inputted by user into a stateful variable
  const getQueryParams = (event, userChoice) => {
    event.preventDefault();
    setNumResults(1);
    setSearched(true);
    if (userChoice !== 'placeholder') {
      setQueryParams(userChoice);
      console.log(userChoice);
    } else {
      console.log("stahhhp it's a placeholder!")
    }
  }

  const getAdvancedParams = (event, userInput) => {
    event.preventDefault();
    console.log(userInput);
    setAdvancedParams(userInput);
  }
  // save number of results in a stateful variable to be used in API call when user clicks next/previous page
  const handleResultPages = (number) => {
    setNumResults(number);
    setShowLoading(true);
    setSearched(false);
  }
  
  const handleLike = (likeStatus, paperDetails) => {
    const database = getDatabase(firebaseConfig);
    const databaseRef = ref(database, `/${[loginCreds[0]]}/favourites`);

    const firebaseObj = push(databaseRef, paperDetails);
    console.log(firebaseObj.key);
    
    if (likeStatus) {
      console.log("like status is true");
    } else {
      // remove(databaseRef, ({id: paperDetails}) )
      console.log("likestaus is false")
    }
    
  }

  const handleUnLike = () => {
    const database = getDatabase(firebaseConfig);
    // const databaseRef = ref(database, `/${bookId}`)
  }
  // call the API based on user input
  useEffect (() => {
    if (queryParams !== 'placeholder' && queryParams !== '') {
      console.log(queryParams);
      console.log(advancedParams['year']);
      axios({
        url: 'http://api.springernature.com/openaccess/json',
        params: {
          // api_key:'d358a2b18c4f7efb5bf611352385eeaf',
          api_key:'b1d9463d9bc800cb5d5134b95771983c',
          // q:`(subject:${queryParams} AND language:"en")`,
          q:`(subject: undefined AND language:"en")`,
          p: 10,
          s: numResults,
        },
      }).then((res) => {
        console.log(res.data)
          // console.log(res.data.records);
          setPublications(res.data.records);
          setShowLoading(false);
      })
    }
  }, [queryParams, numResults, advancedParams]);

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
    <main>
      <header>
        <h1>SciLib</h1>
        <p>Welcome to SciLib - a library for you to browse and store your favourite scientific literature! For casual browsing, simply select a subject of interest from the dropdown menu to see recent papers related to that subject. To tailor your search, use the Advanced Search option. </p>
        <SearchForm getQueryParams={getQueryParams} setShowLoading={setShowLoading} setLandingPage={setLandingPage}/> 
        <AdvancedSearchForm getAdvancedParams={getAdvancedParams} setShowLoading={setShowLoading} setLandingPage={setLandingPage}/>
        <p>
        If you would like to curate your personal favourites list, please login or sign up.
        </p>
      </header>
      
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
            : <ChangePage handleResultPages={handleResultPages} publications={publications} searched={searched}/>
      }
      
      <footer>Created by Tina Lu at <a href="https://junocollege.com/">Juno College</a></footer>
    </main>
  );
}

export default App;
