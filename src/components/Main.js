import React from 'react'
import Article from './Article'
import Prompt from './Prompt';
import Sidebar from './Sidebar'
import '../style/main.css'

const Main = ({landing, articles, index, userInfo, theme, layout}) => {
    if (userInfo) {
        return (
            <main className="blog">
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />
                {!landing ?
                    <div className={"articles-container " + layout.main}>
                        <Article userInfo={userInfo} article={articles[index]} theme={theme} layout={{"main": "basic", "child": "basic-child"}} />
                    </div> :
                    <div className={"articles-container " + layout.main}>
                        {Object.values(articles).map((article, artIndex) =>
                            <Article key={artIndex} index={artIndex} userInfo={userInfo} article={articles[artIndex]} theme={theme} layout={layout} limit={true} />
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