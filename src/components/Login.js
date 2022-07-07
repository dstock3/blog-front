import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/login.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [pw, setPw] = useState("")

    const loginHandler = async (e) => {
        e.preventDefault();
        try { 

        } catch { 

        }

    }

    return (
        <div className={"register dark"}>
            <form onSubmit={loginHandler} className="loginForm" action="" method="POST">
                <h2 className="form-head">Login</h2>
                <div className="user-login-container">
                    <label className="log-label" htmlFor="username">Username: </label>
                    <input value={username} type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div className="user-password-container">
                    <label className="log-label" htmlFor="password">Password: </label>
                    <input value={pw} type="password" name="password" onChange={(e) => setPw(e.target.value)}></input>
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