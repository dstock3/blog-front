import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/login.css'


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPw] = useState("")
    const [message, setMessage] = useState("")
    const nav = useNavigate()

    const loginHandler = async (e) => {
        e.preventDefault();

        axios
            .post('https://stormy-waters-34046.herokuapp.com/login', { username, password })
            .then((res) => {
                if (res.status === 200) {
                    setUsername("")
                    setPw("")
                    localStorage.setItem('user', res.data);
                    nav('/');
                } else {
                    setMessage("Some error occurred")
                }
              })
            .catch((err) => {
                if (err.response.status === 401) {
                    setMessage(err.response.data.message);
                } else {
                    setMessage("Some error occured");
                }  
            });  
    }

    return (
        <div className={"login dark"}>
            <form onSubmit={loginHandler} className="loginForm" action="" method="POST">
                <h2 className="form-head">Login</h2>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <div className="user-login-container">
                    <label className="log-label" htmlFor="username">Username: </label>
                    <input 
                        type="text" 
                        name="username" 
                        onChange={(e) => setUsername(e.target.value)}
                        required>
                    </input>
                </div>

                <div className="user-password-container">
                    <label className="log-label" htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPw(e.target.value)}
                        required>    
                    </input>
                </div>

                <button type="submit" className="submit-btn log-btn">Login</button>
            </form>
            <div className="prompt-container">
                <div className="reg-prompt">Don't have an Account?</div>
                <Link to = {{pathname: '/register'}}>Register</Link>
            </div>
        </div>
    );
}

export default Login;