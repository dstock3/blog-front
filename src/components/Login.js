import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/login.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [pw, setPw] = useState("")
    const [message, setMessage] = useState("")

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch('https://stormy-waters-34046.herokuapp.com/login', {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: pw,
                })
            })

            let resJson = await res.json();

            if (res.status === 200) {
                console.log(resJson)
                setUsername("")
                setPw("")
                setMessage("Login successful");
            } else {
                setMessage("Some error occurred")
            }

        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    return (
        <div className={"login dark"}>
            <form onSubmit={loginHandler} className="loginForm" action="" method="POST">
                <h2 className="form-head">Login</h2>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <div className="user-login-container">
                    <label className="log-label" htmlFor="username">Username: </label>
                    <input value={username} type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input>
                </div>

                <div className="user-password-container">
                    <label className="log-label" htmlFor="password">Password: </label>
                    <input value={pw} type="password" name="password" onChange={(e) => setPw(e.target.value)}></input>
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