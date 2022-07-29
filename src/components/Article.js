import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { parseJwt } from '../auth/parseToken'
import DeleteArticle from "./DeleteArticle";

const Article = ({ users, article, articleId, userInfo, theme, layout, limit, author, setUpdate }) => {
    const [abstract, setAbstract] = useState(article["content"])
    const [message, setMessage] = useState("")
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [comments, setComments] = useState([])
    const [commentUpdate, setCommentUpdate] = useState(false)
    const [showComments, setShowComments] = useState(true)
    const [toDelete, setToDelete] = useState(false)
    const nav = useNavigate()

    const editArticle = () => {
        setUpdate({"content": article["content"], "title": article["title"], "articleId": article._id})
        nav('/compose')
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
        fetchComments()
    }, [articleId])
    
    return (
        <article className={theme + " " + layout + "-child"}>
            <div className="article-head">
                <div className="article-head-subcontainer">
                    <h1 className="article-name">{article["title"]}</h1>
                    {author ?
                        <div className="article-author">
                            <Link to ={"/" + userInfo["profileName"]}>
                                {author}
                            </Link>
                        </div> : null}
                    <div className="date-posted">{article["date"]}</div>
                </div>
                <div className="article-dashboard">
                    {limit ? 
                        null :
                            isAuthorized ?
                                <>
                                    <div className={"article-edit-btn " + theme + "-accent"} onClick={editArticle}>Edit</div>
                                    <div className={"article-edit-btn " + theme + "-accent"} onClick={() => setToDelete(true)}>Delete</div>
                                </> : null
                    }
                </div>
            </div>

            {article["img"] ?
                layout.main === "card" ?
                    <div className="img-container img-card-view">
                        <img className="article-img" src={article["img"]} alt={article["img-desc"]}></img>
                        <div className="article-img-caption">{article["img-desc"]}</div>
                    </div> :
                <div className="img-container">
                    <img className="article-img" src={article["img"]} alt={article["img-desc"]}></img>
                    <div className="article-img-caption">{article["img-desc"]}</div>
                </div> :
                null
            }
            <>
                {toDelete ?
                    <DeleteArticle theme={theme} toDelete={toDelete} userInfo={userInfo} articleId={articleId} setToDelete={setToDelete}/> : null}
            </>
            {limit ?
                article["content"].length < 400 ?
                    <div className="article-content">{article["content"]}</div> :
                    <div className="article-content">
                        {abstract}...
                        <div className="read-more"> 
                            <Link to ={"/" + userInfo["profileName"] + "/" + article._id}>
                                Read More
                            </Link>
                        </div>
                    </div> :
                <>
                    <div className="article-content">
                        {article["content"]}
                    </div>
                    <CommentForm users={users} userInfo={userInfo} articleId={article._id} theme={theme} update={commentUpdate} setShowComments={setShowComments} fetchComments={fetchComments} />
                    
                    {Object.keys(comments).length !== 0 ?
                        <ul className={"comments-container " + theme + "-accent"}>
                            <div className="comment-head-container">
                                <h3 className="comment-head">Comments {"(" + comments.length + ")"}</h3>
                                <div className={"show-comments-btn " + theme} onClick={()=> setShowComments(!showComments)}>
                                    {showComments ? "Minimize Comments" : "Show Comments"}
                                </div>
                            </div>
                            {showComments ? 
                                Object.values(comments).map((comment, thisIndex) =>
                                    <Comment key={thisIndex} articleAuthor={userInfo} comment={comment} articleId={article._id} setUpdate={setCommentUpdate} theme={theme} />
                                ) : null
                            }
                        </ul> : 
                        null
                    }
                </>
            }
        </article>
    );
}

export default Article;