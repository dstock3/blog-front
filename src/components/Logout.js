import React, { useEffect, useState } from 'react'

const Logout = () => {
    const [logoutMessage, setLogoutMessage] = useState("")
    useEffect(()=> {
        let apiCall = 'https://stormy-waters-34046.herokuapp.com/logout'
        
        fetch(apiCall)
        .then(
            function(response) {
                return response.json()
            }
        )
        .then(
            function(data) {
                if (data["message"] === "logout successful") {
                    setLogoutMessage("You have successfully logged out.")
                } else {
                    setLogoutMessage("There was a problem with your request.")
                }
            }
        )
        .catch(
            function(err) {
                console.log(err)
            }
        )
    }, [])

    return (
        <main className="logout-page">
            <div className="logout-message">{logoutMessage}</div>
        </main>
        
    )
}

export default Logout