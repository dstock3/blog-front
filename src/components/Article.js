const Article = ({article, theme}) => {
    return (
        <article className={theme.main}>
            <div className="article-head">
                <h1 className="article-name">{article["title"]}</h1>
                <div className="date-posted">{article["date"]}</div>
            </div>
            
            <div className="article-content">{article["content"]}</div>
        </article>
    );
}

export default Article;