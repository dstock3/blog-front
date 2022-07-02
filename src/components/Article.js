import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Article = ({article, userInfo, theme, layout, limit, index, author}) => {
    const [abstract, setAbstract] = useState(article["content"])

    useEffect(()=> {
        if (article["content"].length > 400) {
            let dif = article["content"].length - 400;
            setAbstract(article["content"].substring(0, article["content"].length - dif))
        }
    }, [])

    return (
        <article className={theme + " " + layout.child}>
            <div className="article-head">
                <h1 className="article-name">{article["title"]}</h1>
                {author ?
                    <div className="article-author">
                        <Link to ={"/" + userInfo["profile-name"]}>
                            {author}
                        </Link>
                    </div> : null}
                <div className="date-posted">{article["date"]}</div>
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
            {limit ?
                article["content"].length < 400 ?
                    <div className="article-content">{article["content"]}</div> :
                    <div className="article-content">
                        {abstract}...
                        <div className="read-more"> 
                            <Link to ={"/" + userInfo["profile-name"] + "/" + index}>
                                Read More
                            </Link>
                        </div>
                    </div> :
                <>
                    <div className="article-content">
                        {article["content"]}
                    </div>
                    <CommentForm userInfo={userInfo} theme={theme} />
                    {article["comments"] ?
                        <ul className={"comments-container " + theme + "-accent"}>
                        <h3 className="comment-head">Comments</h3>
                        {Object.keys(article["comments"]).map((keyName, index) =>
                                <Comment key={index} username={keyName} content={article["comments"][keyName]} />
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