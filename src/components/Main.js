import React, { useEffect, useState } from 'react'
import Article from './Article'
import Prompt from './Prompt';
import Sidebar from './Sidebar'
import '../style/main.css'
import { Link } from 'react-router-dom';

const Main = ({getUserData, users, landing, article, articles, userInfo, theme, layout, setUpdate}) => {
    const [thisArticle, setThisArticle] = useState(false)
    const [message, setMessage] = useState(false)
    const [commentMessage, setCommentMessage] = useState("")
    const [comments, setComments] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const fetchArticle =  async(articleId) => {
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setThisArticle(resJson.article)
                
            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
        }
    }

    const fetchComments = async (articleId) => {
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}/comments`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setComments(resJson.comments)
            } else {
                setCommentMessage("Some error occured");
            }
        } catch(err) {
            setCommentMessage("Some error occured");
        }
    }

    useEffect(()=> {
        if (!landing) {
            fetchArticle(article._id)
            fetchComments(article._id)
        } else {
            getUserData()
        }
    }, [])

    if (userInfo) {
        return (
            <main className="blog">
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} fetchArticle={fetchArticle} />
                {!landing && thisArticle ?
                    <div className={"articles-container " + layout}>
                        {message ? <div className="message">{message}</div> : null }
                        <Article getUserData={getUserData} users={users} userInfo={userInfo} articleId={thisArticle._id} article={thisArticle} theme={theme} layout={layout} setUpdate={setUpdate} fetchComments={fetchComments} comments={comments} commentMessage={commentMessage} setComments={setComments}/>
                    </div> :
                    <div className={"articles-container " + layout}>
                        {articles.length !== 0 ?
                            Object.values(articles).map((articleItem, artIndex) =>
                            <Article key={artIndex} getUserData={getUserData} users={users} articleId={articleItem._id} userInfo={userInfo} article={articles[artIndex]} theme={theme} layout={layout} limit={true} setUpdate={setUpdate} fetchComments={fetchComments} comments={comments} commentMessage={commentMessage} setComments={setComments}/>) :
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