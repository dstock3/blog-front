import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CommentedArticles = () => {
    const [articleList, setArticleList] = useState([])
    const [message, setMessage] = useState("")

    useEffect(()=> {
        const getArticles = async () => {
            try {
                let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/`, {
                    method: "GET"
                    });
                let resJson = await res.json();
                
                if (res.status === 200) {
                    setArticleList(resJson.commentedArticles)
                } else {
                    setMessage("Some error occured");
                }
            } catch(err) {
                setMessage("Some error occured");
                console.log(err);
            }
        }

        getArticles()
        


    }, [])

    if (articleList) {
        return (
            <>
                <h3>Most Commented</h3>
                <ul className="most-commented-articles">
                    {Object.values(articleList).map((article, index) =>
                        <li key={index} className="commented-article-item">
                            <Link to={'/'}>{article.title}</Link>
                        </li>
                    )}
                </ul>
            </>
        )
    } else {
        return (
            <div>
                {message}
            </div>
        )
    };
}

export default CommentedArticles