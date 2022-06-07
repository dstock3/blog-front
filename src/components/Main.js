import React from 'react'
import Article from './Article'
import Sidebar from './Sidebar'
import Data from '../sampleData.json'

const Main = () => {

    return (
        <main className="blog">
            <Sidebar />
            <Article />
        </main>
    );
}

export default Main;