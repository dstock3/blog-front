import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Article = ({article, userInfo, theme, layout, limit, index}) => {
    const [abstract, setAbstract] = useState(article["content"])

    useEffect(()=> {
        if (article["content"].length > 400) {
            let dif = article["content"].length - 400;
            setAbstract(article["content"].substring(0, article["content"].length - dif))
        }
    }, [])

    return (
        <article className={theme.main + " " + layout.child}>
            <div className="article-head">
                <h1 className="article-name">{article["title"]}</h1>
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
                    <div className="article-content">{article["content"]}</div>
                    <ul className="comments-container">
                        {Object.keys(article["comments"]).map((keyName, index) =>
                                    <li className="comment" key={index}>
                                        <div className="comment-username">
                                            {keyName}
                                        </div>
                                        <div className="comment-content">
                                            {article["comments"][keyName]}
                                        </div> 
                                    </li>
                            )}
                    </ul>
                </>
            }
        </article>
    );
}

export default Article;