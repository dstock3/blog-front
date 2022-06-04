import React, { useEffect } from 'react'
import Article from './Article'
import Sidebar from './Sidebar'

const Main = () => {
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
        <main className="blog">
            <Sidebar />
            <Article />
        </main>
    );
}

export default Main;