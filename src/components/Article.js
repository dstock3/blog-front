import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { parseJwt } from '../auth/parseToken'

const Article = ({ users, article, userInfo, theme, layout, limit, author, setUpdate }) => {
    const [articleData, setArticleData] = useState(article)
    const [abstract, setAbstract] = useState(article["content"])
    const [message, setMessage] = useState("")
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [comments, setComments] = useState([])
    const [commentUpdate, setCommentUpdate] = useState(false)
    const nav = useNavigate()

    useEffect(()=> {
    }, [articleData])

    const fetchArticle = async () => {
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${article._id}`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log(resJson)
                setArticleData(resJson)
            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    const editArticle = () => {
        setUpdate({"content": article["content"], "title": articleData["title"], "articleId": article._id})
        nav('/compose')
    }

    const deleteArticle = async() => {
        let token = localStorage.getItem('user');
        if (token) {
            try {
                let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${article._id}`, {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json', "login-token" : token }
                    });
                
                let resJson = await res.json();
                nav(`/${userInfo.profileName}`)

            } catch(err) {
                setMessage("Some error occured");
            }
        } else {
            setMessage("Invalid credentials");
        }
    }

    useEffect(()=> {
        /* check if this is an article authored by the user */
        let token = localStorage.getItem('user');
        if (token) {
            let userData = parseJwt(token)
            if (userData._id === userInfo._id) {
                setIsAuthorized(true)
            }
        }
        /* create an article preview */
        if (article["content"].length > 400) {
            let dif = article["content"].length - 400;
            setAbstract(article["content"].substring(0, article["content"].length - dif))
        }
    }, [])

    const fetchComments = async () => {
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${article._id}/comments`, {
                method: "GET"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setComments(resJson.comments)
            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
    }

    useEffect(()=> {
        if (articleData.comments.length > 0) {
            fetchComments()
        }
    }, [article.comments])

    return (
        <article className={theme + " " + layout + "-child"}>
            {limit ? 
                null :
                    isAuthorized ?
                        <div className="article-dashboard">
                            <button onClick={editArticle}>Edit</button>
                            <button onClick={deleteArticle}>Delete</button>
                        </div> : null
            }
            <div className="article-head">
                <h1 className="article-name">{articleData["title"]}</h1>
                {author ?
                    <div className="article-author">
                        <Link to ={"/" + userInfo["profileName"]}>
                            {author}
                        </Link>
                    </div> : null}
                <div className="date-posted">{articleData["date"]}</div>
            </div>

            {article["img"] ?
                layout.main === "card" ?
                    <div className="img-container img-card-view">
                        <img className="article-img" src={articleData["img"]} alt={articleData["img-desc"]}></img>
                        <div className="article-img-caption">{articleData["img-desc"]}</div>
                    </div> :
                <div className="img-container">
                    <img className="article-img" src={articleData["img"]} alt={articleData["img-desc"]}></img>
                    <div className="article-img-caption">{articleData["img-desc"]}</div>
                </div> :
                null
            }
            {limit ?
                article["content"].length < 400 ?
                    <div className="article-content">{articleData["content"]}</div> :
                    <div className="article-content">
                        {abstract}...
                        <div className="read-more"> 
                            <Link to ={"/" + userInfo["profileName"] + "/" + articleData._id}>
                                Read More
                            </Link>
                        </div>
                    </div> :
                <>
                    <div className="article-content">
                        {article["content"]}
                    </div>
                    <CommentForm users={users} userInfo={userInfo} articleId={articleData._id} theme={theme} update={commentUpdate} />
                    
                    {Object.keys(comments).length !== 0 ?
                        <ul className={"comments-container " + theme + "-accent"}>
                            <h3 className="comment-head">Comments</h3>
                            {Object.values(comments).map((comment, thisIndex) =>
                                <Comment key={thisIndex} articleAuthor={userInfo} comment={comment} articleId={articleData._id} setUpdate={setCommentUpdate} theme={theme} />
                            )}
                        </ul> : 
                        null
                    }
                </>
            }
        </article>
    );
}

export default Article;