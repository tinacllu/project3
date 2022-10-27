// import styling
import './styles/styles';
import './App.css';
import axios from 'axios';

// import Components
import Header from './Components/Header';
import Subjects from './Components/Subjects';
import Papers from './Components/Papers';
import Footer from './Components/Footer';

import { useState, useEffect } from 'react';

function App() {
  const [ publications, setPublications] = useState([]);

  // useEffect (() => {
  //   axios({
  //       url: "https://www.rijksmuseum.nl/api/en/collection",
  //       params: {
  //           key: 'FOvckw6G',
  //           imgonly: true,
  //           toppieces: true,
  //       },
  //   }).then((publication) => {
  //       // setPublications(publication.data.artObjects);
  //       console.log('api data has arrived!')
  //       console.log(publications)
  //   })
  //   }, []);


  return (
    <body>
      <Header />
      <Subjects /> 
      {/* pass down apiData as props to subjects  */}
      <ul> 
        {/* map through returned API data  */}
        <Papers />
      </ul>
      <Footer />
    </body>
  );
}

export default App;
