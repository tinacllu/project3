// import styling
import './styles/styles';
import './App.css';

// import Components
import Header from './Components/Header';
import SearchForm from './Components/SearchForm';
import Papers from './Components/Papers';
import ChangePage from './Components/ChangePage';

//import hooks
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ publications, setPublications ] = useState([]);
  const [ queryParams, setQueryParams ] = useState('');
  const [ numResults, setNumResults] = useState(1);
  const [ showLoading, setShowLoading ] = useState(false);
  const [ landingPage, setLandingPage ] = useState(true);

  const getQueryParams = (event, userChoice) => {
    event.preventDefault();
    if (userChoice !== 'placeholder') {
      setQueryParams(userChoice);
      console.log(userChoice);
    } else {
      console.log("stahhhp it's a placeholder!")
    }
  }

  const handleResultPages = (number) => {
    setNumResults(number);
    setShowLoading(true);
  }

  useEffect (() => {
    if (queryParams !== 'placeholder' && queryParams !== '') {
      console.log(queryParams);
      axios({
        url: 'http://api.springernature.com/openaccess/json',
        params: {
          api_key:'d358a2b18c4f7efb5bf611352385eeaf',
          q:`(subject:${queryParams} AND language:"en")`,
          p: 10,
          s: numResults,
        },
      }).then((res) => {
          console.log(res.data.records);
          setPublications(res.data.records);
          setShowLoading(false);
      })
    }
  }, [queryParams, numResults]);

  return (
    <main>
      <Header />
      <SearchForm getQueryParams={getQueryParams} setShowLoading={setShowLoading} setLandingPage={setLandingPage}/> 
      {
        showLoading
          ? <p>Loading</p>
          : <Papers publications={publications} />
      }
      
      {
        landingPage 
          ? null
          : (numResults === 1 && publications.length===0)
            ? showLoading
                ? null
                : <p>No results</p>
            : <ChangePage handleResultPages={handleResultPages} publications={publications}/>
      }
      
      <footer>Created by Tina Lu at <a href="https://junocollege.com/">Juno College</a></footer>
    </main>
  );
}

export default App;
