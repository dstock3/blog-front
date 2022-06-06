import React, { useEffect } from 'react'

const Settings = () => {
    useEffect(()=> {
        const settingsMenu = document.getElementsByClassName("settings-dropdown")[0];
        const settingsIcon = document.getElementsByClassName("settings-icon")[0];
        settingsIcon.addEventListener("click", function() {
            if (settingsMenu.classList.contains("hidden")) {
                settingsMenu.classList.remove("hidden")
                settingsMenu.classList.add("visible")
            } else {
                settingsMenu.classList.remove("visible")
                settingsMenu.classList.add("hidden")
            }
        })

    }, [])

    return (
        <>
            <div className="settings-icon">Settings</div>
            <div className="settings-dropdown hidden">
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