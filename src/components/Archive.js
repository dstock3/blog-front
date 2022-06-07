const Archive = ({articles}) => {
    return (
        <div className="archive">
            <ul className="archive-list">
                {Object.values(articles).map((article, index) => {
                    return <li key={index}>{article["title"]}</li>
                })}
            </ul>
        </div>
    );
}

export default Archive;