import React, { useState, useEffect } from 'react'
import Article from './Article'
const Home = ({theme, users}) => {
    const [articleList, setArticleList] = useState(false)

    function randomizeList(articleList) {
        for (let i = articleList.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [articleList[i], articleList[randomIndex]] = [articleList[randomIndex], articleList[i]];
        }
    
    }

    useEffect(()=> {
        let list = []
        for (const user in users) {
            let thisUser = users[user]
            for (const article in thisUser.articles) {
                list.push({"author": thisUser, "article": thisUser.articles[article], "ind": parseInt(article)})
            }
        }
        randomizeList(list)
        setArticleList(list)
    }, [])


    if (articleList) {
        return (
            <main className={"home " + theme + "-accent"}>
                <div className={"articles-container basic"}>
                    {articleList.map((val, artIndex) => (
                         <Article key={artIndex} index={val["ind"]} author={val["author"]["profile-name"]} userInfo={val["author"]} article={val["article"]} theme={theme} layout={"basic"} limit={true} />
                    ))}
                </div>
            </main>
        )
    }
}

export default Home