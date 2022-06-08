import React from 'react'
import Article from './Article'
import Sidebar from './Sidebar'

const Main = ({articles, userInfo, theme, layout}) => {
    return (
        <main className="blog">
            <Sidebar userInfo={userInfo} articles={articles} theme={theme} />
            <div className={"articles-container " + layout}>
                {Object.values(articles).map((article, index) => {
                    return index < 3 ?
                        <Article key={index} article={articles[index]} theme={theme} /> : null;
                })}
            </div>
        </main>
    );
}

export default Main;