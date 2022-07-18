import React, { useState } from 'react'
import '../style/options.css'
import '../style/register.css'

const Options = ({userInfo, theme}) => {
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [profileDesc, setProfileDesc] = useState("");
    const [themePref, setThemePref] = useState("");
    const [layoutPref, setLayoutPref] = useState("");
    const [dateJoined, setDateJoined] = useState("");
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
         
        try {
            let res = await fetch("https://stormy-waters-34046.herokuapp.com/" + userInfo["profileName"] + "/update", {
                method: "PUT",
                body: JSON.stringify({
                    profileName: profileName,
                    password: password,
                    confirmPassword: confirmPassword,
                    blogTitle: blogTitle,
                    profileDesc: profileDesc,
                    themePref: themePref,
                    layoutPref: layoutPref,
                    dateJoined: dateJoined
                    }),
                headers: { 'Content-Type': 'application/json' }
                });

            let resJson = await res.json();

            if (res.status === 200) {
                console.log(resJson)
                setProfileName("");
                setPassword("");
                setConfirmPassword("");
                setBlogTitle("");
                setProfileDesc("");
                setThemePref("");
                setLayoutPref("");
                setDateJoined("");
                setMessage("User updated successfully");
            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    return (
        <main className={"options-page " + theme}>
            <form onSubmit={handleSubmit} className="optionsForm" action="" method="POST">
                <h2 className="form-head">Options</h2>
                <div className="options-desc">Update your profile information and preferences</div>
                <div className="user-register-container">
                    <label className="reg-label" htmlFor="profileName">Username: </label>
                    <input type="text" value={profileName} name="profileName" onChange={(e) => setProfileName(e.target.value)}></input>
                </div>

                <div className="user-pw-container">
                    <label className="reg-label" htmlFor="password">Password: </label>
                    <input type="password" value={password} id="pw-one" name="password" onChange={(e) => setPassword(e.target.value)}></input>

                    <label className="reg-label" htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" value={confirmPassword} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>

                <div className="user-register-container">
                    <label className="reg-label" htmlFor="blogTitle">Blog Title: </label>
                    <input type="text" value={blogTitle} name="blogTitle" onChange={(e) => setBlogTitle(e.target.value)}></input>
                </div>

                <div className="profile-desc-container">
                    <label className="reg-label" htmlFor="profileDesc">Profile Description: </label>
                    <textarea type="text" value={profileDesc} name="profileDesc" onChange={(e) => setProfileDesc(e.target.value)}></textarea>
                </div>

                <div className="user-register-dropdowns">
                    <label className="reg-label-drop" htmlFor="themePref">Theme Preference: 
                        <select id="drop-one" name="themePref" value={themePref} onChange={(e) => setThemePref(e.target.value)}>
                            <option selected value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="artic">Artic</option>
                            <option value="forest">Forest</option>
                            <option value="azure">Azure</option>
                        </select>
                    </label>

                    <label className="reg-label-drop" htmlFor="layoutPref">Layout Preference: 
                        <select id="drop-two" name="layoutPref" value={layoutPref} onChange={(e) => setLayoutPref(e.target.value)}>
                            <option value="basic">Basic</option>
                            <option value="card">Card</option>
                        </select>
                    </label>
                </div>

                <button type="submit" className="submit-btn">Update Profile</button>
            </form>
            <div className="message">{message ? <p>{message}</p> : null}</div>
        </main>
    )
}

export default Options