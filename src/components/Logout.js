import React, { useEffect, useState } from 'react'

const Logout = ({setIsLoggedIn}) => {
    const [logoutMessage, setLogoutMessage] = useState("");

    useEffect(()=> {
        localStorage.clear();
        setIsLoggedIn(false)
        setLogoutMessage("You are now logged out.")

    }, [])

    return (
        <main className="logout-page">
            <div className="logout-message">{logoutMessage}</div>
        </main>
        
    )
}

export default Logout