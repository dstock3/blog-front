import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Article = ({ article, userInfo, theme, layout, limit, author}) => {
    const [articleData, setArticleData] = useState(article)
    const [abstract, setAbstract] = useState(article["content"])
    const [message, setMessage] = useState("")
    
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

    useEffect(()=> {
        if (article["content"].length > 400) {
            let dif = article["content"].length - 400;
            setAbstract(article["content"].substring(0, article["content"].length - dif))
        }

    }, [])



    return (
        <article className={theme + " " + layout + "-child"}>
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
                    <CommentForm userInfo={userInfo} articleId={articleData._id} theme={theme} fetchArticle={fetchArticle} />
                    
                    {Object.keys(articleData["comments"]).length > 0 ?
                        <ul className={"comments-container " + theme + "-accent"}>
                        <h3 className="comment-head">Comments</h3>
                        {Object.values(articleData["comments"]).map((comment, thisIndex) =>
                            <Comment key={thisIndex} username={comment.profileName} content={comment.content} />
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