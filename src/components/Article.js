const Article = ({article}) => {
    return (
        <div className="article">
            <h1 className="article-name">{article["title"]}</h1>
            <article>{article["content"]}</article>
        </div>
    );
}

export default Article;