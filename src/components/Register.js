import { useState } from 'react';
import { Link } from 'react-router-dom'
import '../style/register.css'

const Register = () => {
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [blogTitle, setBlogTitle] = useState("");
    const [profileDesc, setProfileDesc] = useState("");
    const [themePref, setThemePref] = useState("");
    const [layoutPref, setLayoutPref] = useState("");
    const [message, setMessage] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch('https://stormy-waters-34046.herokuapp.com/register', {
                method: "POST",
                body: JSON.stringify({
                    profileName: profileName,
                    password: password,
                    confirmPassword: confirmPassword,
                    blogTitle: blogTitle,
                    profileDesc: profileDesc,
                    themePref: themePref,
                    layoutPref: layoutPref,
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
                    setMessage("User created successfully");
                } else {
                    setMessage("Some error occured");
                }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    return (
        <div className={"register dark"}>
            <form onSubmit={handleSubmit} className="registerForm" action="" method="POST">
                <h2 className="form-head">Register</h2>
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

                <div className="user-register-container">
                    <label className="reg-label" htmlFor="profileDesc">Profile Description: </label>
                    <textarea type="text" value={profileDesc} name="profileDesc" onChange={(e) => setProfileDesc(e.target.value)}></textarea>
                </div>

                <div className="user-register-dropdowns">
                    <label className="reg-label-drop" htmlFor="themePref">Theme Preference: 
                        <select id="drop-one" name="themePref" value={themePref} onChange={(e) => setThemePref(e.target.value)}>
                            <option selected value="light">Light</option>
                            <option value="dark">Dark</option>
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

                <button type="submit" className="submit-btn reg-btn">Register</button>
            </form>
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div className="prompt-container">
                <div className="login-prompt">Already Have a Profile?</div>
                <Link to = {{pathname: '/login'}}>Sign In</Link>
            </div>
        </div>
    );
}

export default Register;