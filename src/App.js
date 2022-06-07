import { useEffect } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import './App.css';

const App = () => {
  /* 
  useEffect(()=> {
    let apiCall = ``

    fetch(apiCall)
      .then(
          function(response) {
              return response.json()
          }
      )
      .then(
          function(data) {

          }
      )
      .catch(
          function(err) {
              console.log(err)
          }
      )
  }, []) 
  */
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
