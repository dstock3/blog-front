import React from 'react'
import Article from './Article'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const Main = ({articles, userInfo, theme, layout}) => {
    if (userInfo) {
        return (
            <main className="blog">
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />
                <div className={"articles-container " + layout.main}>
                    {Object.values(articles).map((article, index) => {
                        return index < 3 ?
                            <Article key={index} article={articles[index]} theme={theme} layout={layout} /> : null;
                    })}
                </div>
            </main>
        );
    } else {
        return (
            <main className="prompt-container">
                <div className="register-prompt">
                    <div>You aren't logged in. Would you like to create a profile?</div>

                    <Link to = {{pathname: '/register'}}>
                        Register
                    </Link>
                </div>

                <div className="login-prompt">
                    <div>Already have a login?</div>

                    <Link to = {{pathname: '/login'}}>
                        Sign In
                    </Link>
                </div>
            </main>
        )
    }

}

export default Main;