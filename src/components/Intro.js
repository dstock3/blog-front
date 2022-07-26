import React from 'react'
import { Link } from 'react-router-dom'

const Intro = ({theme}) => {
  return (
    <div className={"intro-container " + theme + "-accent"}>
        <div className="intro">Welcome to <b>BlogDog</b>, a content management system designed to maximize ease of use.</div>
        <div className="login-prompt">
            <Link to="/login">Login</Link> to access CMS features.
        </div>
        <div className="register-prompt">
            Don't have an account yet? <Link to="/register">Register</Link> to access features.
        </div>
    </div>
  )
}

export default Intro