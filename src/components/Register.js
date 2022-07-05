import { Link } from 'react-router-dom'
import '../style/register.css'

const Register = () => {
    return (
        <div className={"register dark"}>
            <form className="registerForm" action="" method="POST">
                <h2 className="form-head">Register</h2>
                <div className="user-register-container">
                    <label className="reg-label" htmlFor="profileName">Username: </label>
                    <input type="text" name="profileName"></input>
                </div>

                <div className="user-pw-container">
                    <label className="reg-label" htmlFor="password">Password: </label>
                    <input type="password" id="pw-one" name="password"></input>

                    <label className="reg-label" htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" name="confirmPassword"></input>
                </div>

                <div className="user-register-container">
                    <label className="reg-label" htmlFor="blogTitle">Blog Title: </label>
                    <input type="text" name="blogTitle"></input>
                </div>

                <div className="user-register-container">
                    <label className="reg-label" htmlFor="profileDesc">Profile Description: </label>
                    <textarea type="text" name="profileDesc"></textarea>
                </div>

                <div className="user-register-dropdowns">
                    {/* Turn this into dropdown */}
                    <label className="reg-label-drop" htmlFor="themePref">Theme Preference: </label>
                    <input type="text" id="drop-one" name="themePref"></input>

                    {/* Turn this into dropdown */}
                    <label className="reg-label-drop" htmlFor="layoutPref">Layout Preference: </label>
                    <input type="text" name="layoutPref"></input>
                </div>

                <div className="user-register-container">
                    <label className="reg-label" htmlFor="dateJoined">Date Joined: </label>
                    <input type="text" name="dateJoined"></input>
                </div>

                <button className="submit-btn reg-btn">Register</button>
            </form>
            <div className="prompt-container">
                <div className="login-prompt">Already Have a Profile?</div>
                <Link to = {{pathname: '/login'}}>Sign In</Link>
            </div>
        </div>
    );
}

export default Register;