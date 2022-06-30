import { Link } from 'react-router-dom';
import '../style/login.css'

const Login = () => {
    return (
        <div className={"register dark"}>
            <form className="loginForm" action="" method="POST">
                <h2 className="form-head">Login</h2>
                <div className="user-login-container">
                    <label className="log-label" htmlFor="username">Username: </label>
                    <input type="text" name="username"></input>
                </div>

                <div className="user-password-container">
                    <label className="log-label" htmlFor="password">Password: </label>
                    <input type="password" name="password"></input>
                </div>

                <button className="submit-btn log-btn">Login</button>
            </form>
            <div className="prompt-container">
                <div className="reg-prompt">Don't have an Account?</div>
                <Link to = {{pathname: '/register'}}>Register</Link>
            </div>
        </div>
    );
}

export default Login;