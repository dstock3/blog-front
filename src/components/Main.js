import React from 'react'
import Article from './Article'
import Prompt from './Prompt';
import Sidebar from './Sidebar'

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
            <Prompt />
        )
    }
}

export default Main;