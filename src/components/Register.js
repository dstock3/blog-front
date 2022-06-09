const Register = () => {
    return (
        <div className="register">
            <form className="registerForm" action="" method="POST">
                
                <div className="user-register-container">
                    <label for="username">Username: </label>
                    <input type="text" name="username"></input>
                </div>

                <div className="user-register-container">
                    <label for="password">Password: </label>
                    <input type="password" name="password"></input>

                    <label for="confirmPassword">Confirm Password: </label>
                    <input type="password" name="confirmPassword"></input>
                </div>
                
                <button className="submit-btn">Login</button>
            </form>

        </div>
    );
}

export default Register;