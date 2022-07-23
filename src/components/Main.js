import React from 'react'
import Article from './Article'
import Prompt from './Prompt';
import Sidebar from './Sidebar'
import '../style/main.css'

const Main = ({users, landing, article, articles, userInfo, theme, layout}) => {
    if (userInfo) {
        return (
            <main className="blog">
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />
                {!landing ?
                    <div className={"articles-container " + layout}>
                        <Article users={users} userInfo={userInfo} articleId={article._id} article={article} theme={theme} layout={layout} />
                    </div> :
                    <div className={"articles-container " + layout}>
                        {Object.values(articles).map((thisArticle, artIndex) =>
                            <Article key={artIndex} users={users} articleId={thisArticle._id} userInfo={userInfo} article={articles[artIndex]} theme={theme} layout={layout} limit={true} />
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