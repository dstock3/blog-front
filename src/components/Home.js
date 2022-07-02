import React, { useEffect, useState } from 'react'

const Home = ({theme, users}) => {
    const [articles, setArticles] = useState(null)

    useEffect(() => {
        

    }, [users])

    return (
        <main className={"home " + theme}>

        </main>
    )
}

export default Home