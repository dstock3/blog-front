import axios from "axios";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/login.css'

const Login = ({setUser}) => {
    const [username, setUsername] = useState("")
    const [pw, setPw] = useState("")
    const [message, setMessage] = useState("")

    const loginHandler = async (e) => {
        e.preventDefault();
        
        try {
            let res = await fetch('https://stormy-waters-34046.herokuapp.com/login', {
                mode: 'no-cors',
                method: "POST",
                body: JSON.stringify({
                    profileName: username,
                    password: pw,
                })
            })

            let resJson = await res.json();

            if (res.status === 200) {
                console.log(resJson)
                localStorage.setItem("user", JSON.stringify(res.data));
                setUsername("")
                setPw("")
                setMessage("Login successful");
            } else {
                console.log(resJson)
                setMessage("Some error occurred")
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
        
        /*
        axios
            .post('https://stormy-waters-34046.herokuapp.com/login', { username, pw })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                setUser(res.data.user);
                if (res.status === 200) {
                    setUsername("")
                    setPw("")
                    setMessage("Login successful");
                } else {
                    setMessage("Some error occurred")
                }
              })
            .catch((err) => {
                if (err.response.status === 401) {
                    setMessage(err.response.data.message);
                }
                setMessage("Some error occured");
                console.log(err);
            });
        */
        
            
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