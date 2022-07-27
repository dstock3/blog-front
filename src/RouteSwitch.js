import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Main from './components/Main';
import User from './components/User';
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
    const [userInfo, setUserInfo] = useState(false)
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
        //localStorage.clear();
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
                        for (let prop in data["users"]) {
                            if (data["users"][prop]._id === parseJwt(newUser)._id) {
                                setUser(data["users"][prop])
                                setTheme(data["users"][prop]["themePref"])
                                setArticles(data["users"][prop]["articles"])
                                setLayout(data["users"][prop]["layoutPref"])
                            }
                        }
                        
                        setIsLoggedIn(true)
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
    }, [user]) 

    return (
        <BrowserRouter>
                <Routes>
                    {/* Home */}
                    <Route path={"/"}  element={
                        isLoading ?
                            <div className={"App dark-accent"}>
                                <Header theme="dark" title="BlogDog - Simple CMS" />
                                <Spinner />
                                <Footer theme="dark" />
                            </div> :
                            isLoggedIn ?
                                <div className={"App " + theme + "-accent"}>
                                    <Header userInfo={user} theme={theme} title={user.blogTitle} />
                                    <Home isLoggedIn={isLoggedIn} theme="dark" userInfo={user} users={users} />
                                    <Footer theme="dark" />
                                </div> :
                                <div className={"App dark-accent"}>
                                    <Header userInfo={userInfo} theme="dark" title="BlogDog - Simple CMS" />
                                    <Home theme="dark" userInfo={userInfo} users={users} />
                                    <Footer theme="dark" />
                                </div>
                                
                    } />
                    
                    {/* Landing Pages for Each User */}
                    {Object.keys(users).map((keyName, index) =>
                        <Route path={"/" + users[keyName]["profileName"]}  element={
                            <div className={"App " + users[keyName]["themePref"] + "-accent"}>
                                <Header userInfo={user} theme={users[keyName]["themePref"]} title={users[keyName]["blogTitle"]} profileName={users[keyName]["profileName"]} />
                                <Main landing={true} userInfo={users[keyName]} index={false} articles={users[keyName]["articles"]} theme={users[keyName]["themePref"]} layout={users[keyName]["layoutPref"]} />
                                <Footer theme={users[keyName]["themePref"]} />
                            </div>
                        } />
                    )}

                    {/* Register */}
                    <Route path="/register" element={
                        <div className={"App dark-accent"}>
                            <Header userInfo={userInfo} theme={"dark"} title={"BlogDog - Simple CMS"} />
                            <Register />
                            <Footer theme={"dark"} />
                        </div>
                    } />

                    {/* Login */}
                    <Route path="/login" element={
                        <div className={"App dark-accent"}>
                            <Header userInfo={userInfo} theme={"dark"} title={"BlogDog - Simple CMS"} />
                            <Login setUser={setUser}/>
                            <Footer theme={"dark"} />
                        </div>
                    } />

                    {/* Logout */}
                    <Route path="/logout" element={
                        <div className={"App " + theme + "-accent"}>
                            <Header userInfo={userInfo} theme={"dark"} title={"BlogDog - Simple CMS"} />
                            <Logout />
                            <Footer theme={"dark"} />
                        </div>
                    } />

                    {/* Options */}
                    <Route path="/options" element={
                        <div className={"App " + theme + "-accent"}>
                            <Header userInfo={user} theme={theme} title={user.blogTitle} profileName={user.profileName} />
                            <Options userInfo={userInfo} theme={theme} />
                            <Footer theme={theme} />
                        </div>
                    } />

                    {/* User Profile Pages */}
                    {Object.values(users).map((thisUser, index) =>
                        <Route key={index} path={"/" + thisUser["profileName"] + "/profile"} element={
                            <div className={"App " + thisUser["themePref"] + "-accent"}>
                                <Header userInfo={user} profileName={thisUser["profileName"]} theme={thisUser["themePref"]} title={thisUser["blogTitle"]} />
                                <User userInfo={thisUser} articles={thisUser.articles} theme={thisUser["themePref"]} />
                                <Footer theme={thisUser["themePref"]} />
                            </div>
                        } />
                    )}

                    {/* Compose */}
                    <Route path={"/compose"} element={
                        <div className={"App " + theme + "-accent"}>
                            <Header userInfo={user} theme={theme} title={user.blogTitle} profileName={user.profileName} />
                            <Compose userInfo={user} theme={theme} articles={articles} update={articleUpdate} />
                            <Footer theme={theme} />
                        </div>
                    } />

                    {/* Articles for Each User */}
                    {Object.values(users).map((thisUser, index) =>
                        Object.values(thisUser["articles"]).map((val, thisIndex) =>
                            <Route key={thisIndex} path={"/" + thisUser["profileName"] + "/" + val._id} element={
                                <div className={"App " + thisUser["themePref"] + "-accent"}>
                                    <Header userInfo={userInfo} profileName={thisUser["profileName"]} theme={thisUser["themePref"]} title={thisUser["blogTitle"]} />
                                    <Main users={users} userInfo={thisUser} landing={false} article={val} articles={thisUser["articles"]} theme={thisUser["themePref"]} layout={thisUser["layoutPref"]} setUpdate={setArticleUpdate} />
                                    <Footer theme={thisUser["themePref"]} />
                                </div>
                            } /> 
                        )
                    )}
                </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
