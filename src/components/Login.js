const Login = () => {
    return (
        <div className="login">
            <form className="loginForm" action="" method="POST">
                <h2>Login</h2>
                <div className="user-login-container">
                    <label for="username">Username: </label>
                    <input type="text" name="username"></input>
                </div>

                <div className="user-password-container">
                    <label for="password">Password: </label>
                    <input type="password" name="password"></input>
                </div>

                <button className="submit-btn">Login</button>
            </form>
        </div>
    );
}

export default Login;