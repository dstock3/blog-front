import React, { useEffect } from 'react'

const Settings = () => {
    useEffect(()=> {
        const settings = document.getElementsByClassName("settings")[0];
        settings.addEventListener("click", function() {
            if (settings.classList.contains("hidden")) {
                settings.classList.remove("hidden")
                settings.classList.add("visible")
            } else {
                settings.classList.remove("visible")
                settings.classList.add("hidden")
            }
        })

    }, [])

    return (
        <div className="settings hidden">Settings</div>
    );
}

export default Settings;