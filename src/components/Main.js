import React from 'react'
import Article from './Article'
import Prompt from './Prompt';
import Sidebar from './Sidebar'
import '../style/main.css'
import { Link } from 'react-router-dom';

const Main = ({users, landing, article, articles, userInfo, theme, layout, setUpdate}) => {
    if (userInfo) {
        return (
            <main className="blog">
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />
                {!landing ?
                    <div className={"articles-container " + layout}>
                        <Article users={users} userInfo={userInfo} articleId={article._id} article={article} theme={theme} layout={layout} setUpdate={setUpdate} />
                    </div> :
                    <div className={"articles-container " + layout}>
                        {articles.length !== 0 ?
                            Object.values(articles).map((thisArticle, artIndex) =>
                            <Article key={artIndex} users={users} articleId={thisArticle._id} userInfo={userInfo} article={articles[artIndex]} theme={theme} layout={layout} limit={true} setUpdate={setUpdate} />) :
                            <div className={"compose-prompt " + theme}>
                                <p>You haven't written any articles. Would you like to compose a new one?</p>
                                <Link className="compose-link" to="/compose">Compose Article</Link>
                            </div>   
                        }

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