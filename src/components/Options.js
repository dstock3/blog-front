import React, { useState } from 'react'
import '../style/options.css'

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
                <h2 className="form-head">Update Profile</h2>

                <button type="submit" className="submit-btn">Update Profile</button>
            </form>
        </main>
    )
}

export default Options