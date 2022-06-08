import React from 'react'
import Article from './Article'
import Sidebar from './Sidebar'

const Main = ({articles, userInfo, theme}) => {
    return (
        <main className="blog">
            <Sidebar userInfo={userInfo} articles={articles} theme={theme} />
            <div className="articles-container">
                {Object.values(articles).map((article, index) => {
                    return index < 3 ?
                        <Article key={index} article={articles[index]} theme={theme} /> : null;
                })}
            </div>
        </main>
    );
}

export default Main;