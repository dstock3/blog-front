import React, { useState } from 'react'

const Settings = () => {
    const [optionsStatus, setOptionsStatus] = useState("hidden")
    
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
            <div className={"settings-dropdown " + optionsStatus}>
                <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                    <li>Option 4</li>
                </ul>
            </div>
        </>
    );
}

export default Settings;