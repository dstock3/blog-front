import { useState, useEffect } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import './App.css';
import Data from './sampleData.json'

const App = () => {
  const [userInfo, setUserInfo] = useState(Data.user)
  const [articles, setArticles] = useState(Data.articles)

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
      <Main userInfo={userInfo} articles={articles} />
      <Footer />
    </div>
  );
}

export default App;
