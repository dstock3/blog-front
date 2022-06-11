import React from 'react'
import Article from './Article'
import Prompt from './Prompt';
import Sidebar from './Sidebar'

const Main = ({articles, index, userInfo, theme, layout}) => {
    if (userInfo) {
        return (
            <main className="blog">
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />
                {index ?
                    <div className={"articles-container " + layout.main}>
                        <Article article={articles[index]} theme={theme} layout={layout} />
                    </div> :
                    <div className={"articles-container " + layout.main}>
                        {Object.values(articles).map((article, artIndex) =>
                            <Article key={artIndex} article={articles[artIndex]} theme={theme} layout={layout} />
                        )}
                    </div>
                }
            </main>
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default Main;