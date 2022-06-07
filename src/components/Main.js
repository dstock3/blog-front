import React from 'react'
import Article from './Article'
import Sidebar from './Sidebar'

const Main = ({articles, userInfo}) => {
    return (
        <main className="blog">
            <Sidebar userInfo={userInfo} articles={articles}/>
            <Article article={articles["0"]}/>
        </main>
    );
}

export default Main;