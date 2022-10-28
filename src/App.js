// import styling
import './styles/styles';
import './App.css';
import axios from 'axios';

// import Components
import Header from './Components/Header';
import SubjectsForm from './Components/SubjectsForm';
import Papers from './Components/Papers';

import { useState, useEffect } from 'react';

function App() {
  const [ publications, setPublications ] = useState([]);
  // make state to store the userchoice 

  const [ queryParams, setQueryParams ] = useState('');

  const getQueryParams = (event, userChoice) => {
    event.preventDefault();
    if (userChoice !== 'placeholder') {
      setQueryParams(userChoice);
      console.log(userChoice);
    } else {
      console.log("stahhhp it's a placeholder!")
    }
  }

  useEffect (() => {
    axios({
        url: 'http://api.springernature.com/openaccess/json',
        params: {
          api_key:'d358a2b18c4f7efb5bf611352385eeaf',
          q: `subject:${queryParams}`,
          p: 10,
        },
    }).then((res) => {
        console.log('api data has arrived!');
        console.log(res);
        console.log(res.data.records);
        setPublications(res.data.records);
    })
    }, [queryParams]);
    // call api on queryParams change


  return (
    <body>
      <Header />
      <SubjectsForm getQueryParams={getQueryParams} /> 


      <Papers publications={publications} />
      
      <footer>Created by Tina Lu at <a href="#">Juno College</a></footer>
    </body>
  );
}

export default App;
