import React, { useEffect, useState } from 'react'

const Logout = ({setIsLoggedIn}) => {
    const [logoutMessage, setLogoutMessage] = useState("");

    useEffect(()=> {
        localStorage.clear();
        setIsLoggedIn(false)
        setLogoutMessage("Thanks for visiting! You are now logged out.")

    }, [])

    return (
        <main className="logout-page dark">
            <div className="logout-message dark-accent">{logoutMessage}</div>
        </main>
        
    )
}

export default Logout