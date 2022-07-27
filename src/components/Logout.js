import React, { useEffect, useState } from 'react'

const Logout = () => {
    const [logoutMessage, setLogoutMessage] = useState("");

    useEffect(()=> {
        localStorage.clear();
        setLogoutMessage("You are now logged out.")

    }, [])

    return (
        <main className="logout-page">
            <div className="logout-message">{logoutMessage}</div>
        </main>
        
    )
}

export default Logout