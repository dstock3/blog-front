const Article = ({article, theme, layout}) => {
    return (
        <article className={theme.main + " " + layout.child}>
            <div className="article-head">
                <h1 className="article-name">{article["title"]}</h1>
                <div className="date-posted">{article["date"]}</div>
            </div>
            {article["img"] ?
                <div className="img-container">
                    <img className="article-img" src={article["img"]} alt={article["img-desc"]}></img>
                </div> :
                null
            }
            <div className="article-content">{article["content"]}</div>
        </article>
    );
}

export default Article;