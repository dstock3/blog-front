import React, { useState } from 'react'

const Settings = ({theme}) => {
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
            <div className={"settings-dropdown " + optionsStatus + " " + theme.main}>
                <ul className="options-list">
                    <li className="option-item">Option 1</li>
                    <li className="option-item">Option 2</li>
                    <li className="option-item">Option 3</li>
                    <li className="option-item">Option 4</li>
                </ul>
            </div>
        </>
    );
}

export default Settings;