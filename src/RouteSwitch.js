import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';
import Compose from './components/Compose';
import Footer from './components/Footer';
import './App.css';
import Home from './components/Home';
import Options from './components/Options';
import Logout from './components/Logout';
import Spinner from './components/Spinner'
import { parseJwt } from './auth/parseToken'

const RouteSwitch = () => {
    const [articles, setArticles] = useState(false)
    const [theme, setTheme] = useState(false)
    const [layout, setLayout] = useState(false)
    const [users, setUsers] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState("")
    const [articleUpdate, setArticleUpdate] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        document.title = "BlogDog - Simple CMS"

    }, [])

    useEffect(()=> {
        let deleteUserModal = document.getElementById('user-delete-modal')
        let deleteArticleModal = document.getElementById('user-delete-modal')
        let rootElement = document.getElementById('root')

        rootElement.style.filter = "unset"

        deleteUserModal.style.zIndex = 0
        deleteArticleModal.style.zIndex = 0
    }, [])

    const getUserData = () => {
        let apiCall = 'https://stormy-waters-34046.herokuapp.com/'

        fetch(apiCall)
            .then(
                function(response) {
                    return response.json()
                }
            )
            .then(
                function(data) {
                    let newUser = localStorage.getItem('user');

                    if (newUser) {
                        setIsLoggedIn(true)
                        for (let prop in data["users"]) {
                            if (data["users"][prop]._id === parseJwt(newUser)._id) {
                                setUser(data["users"][prop])
                                setTheme(data["users"][prop]["themePref"])
                                setArticles(data["users"][prop]["articles"])
                                setLayout(data["users"][prop]["layoutPref"])
                            }
                        }
                    }

                    setUsers(data["users"])
                    setIsLoading(false)
                }
            )
            .catch(
                function(err) {
                    console.log(err)
                }
            )
    }

    useEffect(()=> {
        getUserData()
    }, [isLoggedIn])

    return (
        <BrowserRouter>
                <Routes>
                    {/* Home */}
                    <Route path={"/"}  element={
                        isLoading ?
                            <div className="App dark-accent">
                                <Header theme="dark" title="BlogDog - Simple CMS" />
                                <Spinner theme="dark"/>
                                <Footer theme="dark" />
                            </div> :
                            isLoggedIn ?
                                <div className={"App " + theme + "-accent"}>
                                    <Header userInfo={user} theme={theme} title={user.blogTitle} />
                                    <Home isLoggedIn={isLoggedIn} theme={theme} userInfo={user} users={users} />
                                    <Footer theme={theme} />
                                </div> :
                                <div className="App dark-accent">
                                    <Header theme="dark" title="BlogDog - Simple CMS" />
                                    <Home theme="dark" users={users} />
                                    <Footer theme="dark" />
                                </div> 
                    } />
                    
                    {/* Register */}
                    <Route path="/register" element={
                        <div className="App dark-accent">
                            <Header theme="dark" title="BlogDog - Simple CMS" />
                            <Register />
                            <Footer theme="dark" />
                        </div>
                    } />

                    {/* Login */}
                    <Route path="/login" element={
                        <div className="App dark-accent">
                            <Header theme="dark" title="BlogDog - Simple CMS" />
                            <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>
                            <Footer theme="dark" />
                        </div>
                    } />

                    {/* Logout */}
                    <Route path="/logout" element={
                        <div className="App dark-accent">
                            <Header theme="dark" title="BlogDog - Simple CMS" />
                            <Logout setIsLoggedIn={setIsLoggedIn} />
                            <Footer theme="dark" />
                        </div>
                    } />

                    {/* Options */}
                    <Route path="/options" element={
                        <div className={"App " + theme + "-accent"}>
                            <Header userInfo={user} theme={theme} title={user.blogTitle} profileName={user.profileName} />
                            <Options setTheme={setTheme} userInfo={user} theme={theme} setIsLoggedIn={setIsLoggedIn} />
                            <Footer theme={theme} />
                        </div>
                    } />

                    {/* Compose */}
                    <Route path={"/compose"} element={
                        <div className={"App " + theme + "-accent"}>
                            <Header userInfo={user} theme={theme} title={user.blogTitle} profileName={user.profileName} />
                            <Compose getUserData={getUserData} userInfo={user} theme={theme} articles={articles} update={articleUpdate} />
                            <Footer theme={theme} />
                        </div>
                    } />

                    {/* Articles for Each User */}
                    {Object.values(users).map((thisUser, index) =>
                        Object.values(thisUser["articles"]).map((thisArticle, thisIndex) =>
                            <Route key={thisIndex} path={"/" + thisUser["profileName"] + "/" + thisArticle._id} element={
                                <div className={"App " + thisUser["themePref"] + "-accent"}>
                                    <Header thisUser={user} userInfo={thisUser} profileName={thisUser["profileName"]} theme={thisUser["themePref"]} title={thisUser["blogTitle"]} />
                                    <Main users={users} userInfo={thisUser} landing={false} article={thisArticle} articles={thisUser["articles"]} theme={thisUser["themePref"]} layout={thisUser["layoutPref"]} setUpdate={setArticleUpdate} />
                                    <Footer theme={thisUser["themePref"]} />
                                </div>
                            } /> 
                        )
                    )}
                    
                    {/* Landing Pages for Each User */}
                    {Object.keys(users).map((keyName, index) =>
                        <Route path={"/" + users[keyName]["profileName"]}  element={
                            <div className={"App " + users[keyName]["themePref"] + "-accent"}>
                                <Header thisUser={user} userInfo={users[keyName]} theme={users[keyName]["themePref"]} title={users[keyName]["blogTitle"]} profileName={users[keyName]["profileName"]} />
                                <Main getUserData={getUserData} landing={true} userInfo={users[keyName]} index={false} articles={users[keyName]["articles"]} theme={users[keyName]["themePref"]} layout={users[keyName]["layoutPref"]} />
                                <Footer theme={users[keyName]["themePref"]} />
                            </div>
                        } />
                    )}
                </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
