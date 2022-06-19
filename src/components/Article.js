const Article = ({article, theme, layout}) => {
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
            <div className="article-content">{article["content"]}</div>
        </article>
    );
}

export default Article;