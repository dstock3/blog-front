import React, { useState, useEffect } from 'react'
import '../style/options.css'
import '../style/register.css'
import DeletePortal from './DeletePortal';

const Options = ({userInfo, theme, setIsLoggedIn}) => {
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [profileDesc, setProfileDesc] = useState("");
    const [themePref, setThemePref] = useState("");
    const [layoutPref, setLayoutPref] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [message, setMessage] = useState("")
    const [toDelete, setToDelete] = useState(false)

    useEffect(()=> {
        let modal = document.getElementById('user-delete-modal')
        let rootElement = document.getElementById('root')
        if (toDelete) {
            modal.style.zIndex = 1000
            rootElement.style.filter = 'brightness(65%)'
        } else {
            modal.style.zIndex = 0
            rootElement.style.filter = "unset"
        }

    }, [toDelete])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let body
        if (profilePic) {
            body = JSON.stringify({
                profileName: profileName,
                password: password,
                confirmPassword: confirmPassword,
                blogTitle: blogTitle,
                profileDesc: profileDesc,
                profilePic: profilePic
            });
        } else {
            body = JSON.stringify({
                profileName: profileName,
                password: password,
                confirmPassword: confirmPassword,
                blogTitle: blogTitle,
                profileDesc: profileDesc
            });
        }
         
        try {
            let token = localStorage.getItem('user');

            let res = await fetch("https://stormy-waters-34046.herokuapp.com/" + userInfo["profileName"] + "/update", {
                method: "PUT",
                body: body,
                headers: { 'Content-Type': 'application/json', "login-token" : token }
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
                setProfilePic("");
                setMessage("User updated successfully");
            } else {
                console.log(res)
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    return (
        <>
            <main className={"options-page " + theme}>
                <form onSubmit={handleSubmit} className="optionsForm" action="" method="PUT">
                    <h2 className="form-head">Options</h2>
                    <div className="options-desc">Update your profile information and preferences</div>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                    <div className="user-register-container" id="primary-reg">
                        <label className="reg-label" htmlFor="profileName">Username: </label>
                        <input className="reg-user-input" type="text" value={profileName} name="profileName" onChange={(e) => setProfileName(e.target.value)}></input>
                        <label className="upload-img-label">Profile Pic:</label>
                        <input className="upload-img-input" type="file" name="profilePic" onChange={(e) => setProfilePic(e.target.files[0])}></input>
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
                                <option selected value="light">
                                    <div className="theme-option light-option"></div>
                                    <div className="option-text">Light</div>
                                </option>
                                <option value="dark">
                                    <div className="theme-option dark-option"></div>
                                    <div className="option-text">Dark</div>
                                </option>
                                <option value="artic">
                                    <div className="theme-option artic-option"></div>
                                    <div className="option-text">Artic</div>
                                </option>
                                <option value="forest">
                                    <div className="theme-option forest-option"></div>
                                    <div className="option-text">Forest</div>
                                </option>
                                <option value="azure">
                                    <div className="theme-option light-option"></div>
                                    <div className="option-text">Light</div>
                                </option>
                            </select>
                        </label>

                        <label className="reg-label-drop" htmlFor="layoutPref">Layout Preference: 
                            <select id="drop-two" name="layoutPref" value={layoutPref} onChange={(e) => setLayoutPref(e.target.value)}>
                                <option value="basic">Basic</option>
                                <option value="card">Card</option>
                            </select>
                        </label>
                    </div>

                    <div type="submit" className={"options-btn " + theme + "-accent"}>Update Profile</div>
                </form>
                <div className="deleteForm">
                    <div className={"submit-btn " + theme + "-accent"} onClick={()=> setToDelete(true)}>Delete Profile</div>
                </div>
            </main>
            <>
                {toDelete ?
                    <DeletePortal setIsLoggedIn={setIsLoggedIn} theme={theme} userInfo={userInfo} toDelete={toDelete} setToDelete={setToDelete} />
                    : null}
            </>
        </>
    )
}

export default Options