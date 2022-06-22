import { Link } from 'react-router-dom'
import '../style/register.css'

const Register = ({theme}) => {
    return (
        <div className={"register " + theme.main}>
            <form className="registerForm" action="" method="POST">
                <h2 className="form-head">Register</h2>
                <div className="user-register-container">
                    <label className="reg-label" htmlFor="username">Username: </label>
                    <input type="text" name="username"></input>
                </div>

                <div className="user-register-container">
                    <label className="reg-label" htmlFor="password">Password: </label>
                    <input type="password" name="password"></input>
                </div>

                <div className="user-register-container">
                    <label className="reg-label" for="confirmPassword">Confirm Password: </label>
                    <input type="password" name="confirmPassword"></input>
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