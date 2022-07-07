import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Settings = ({theme}) => {
    const [optionsStatus, setOptionsStatus] = useState("hidden")

    useEffect(() => {

    }, [optionsStatus])

    const toggleStatus = () => {
        if (optionsStatus === "hidden") {
            setOptionsStatus("visible")
        }
        if (optionsStatus === "visible") {
            setOptionsStatus("hidden")
        }
    }

    return (
        <>
            <div onClick={toggleStatus} className="settings-icon">Settings</div>
            <div className={"settings-dropdown " + optionsStatus + " " + theme.main}>
                {/* Thus far, settings should include theme, view (card or basic), edit profile, and logout */}
                <ul className="options-list">
                    <li className="option-item">
                        <Link to ="/login" onClick={() => setOptionsStatus("hidden")}>Sign In</Link>
                    </li>
                    <li className="option-item">
                        <Link to ="/register" onClick={() => setOptionsStatus("hidden")}>Register</Link>
                    </li>
                    <li className="option-item">
                        <Link to ="/" onClick={() => setOptionsStatus("hidden")}>Home</Link>
                    </li>
                    <li className="option-item">
                        <Link to ="/options" onClick={() => setOptionsStatus("hidden")}>Options</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Settings;