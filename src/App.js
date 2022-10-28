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
    console.log(number, 'from result pages son app page!')
    setNumResults(number);
    console.log(numResults)
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
          console.log('api data has arrived!');
          console.log(res);
          console.log(res.data.records);
          setPublications(res.data.records);
      })
    }
  }, [queryParams, numResults]);
  //also call api on numResults


  return (
    <main>
      <Header />
      <SearchForm getQueryParams={getQueryParams} /> 
      <Papers publications={publications} />
      <ChangePage handleResultPages={handleResultPages}/>
      <footer>Created by Tina Lu at <a href="https://junocollege.com/">Juno College</a></footer>
    </main>
  );
}

export default App;
