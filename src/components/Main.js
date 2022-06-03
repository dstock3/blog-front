import React, { useEffect } from 'react'

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
            <div className="sidebar"></div>
            <div className="article"></div>
        </main>
    );
}

export default Main;