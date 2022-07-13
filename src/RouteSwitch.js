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
import Loading from './components/Loading'

const RouteSwitch = () => {
    const [userInfo, setUserInfo] = useState(false)
    const [articles, setArticles] = useState(false)
    const [theme, setTheme] = useState(false)
    const [layout, setLayout] = useState(false)
    const [users, setUsers] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState("")

    useEffect(() => {
        document.title = "BlogDog - Simple CMS"
        
    }, [])

    
    useEffect(()=> {
        let apiCall = 'https://stormy-waters-34046.herokuapp.com/'

        fetch(apiCall)
            .then(
                function(response) {
                    return response.json()
                }
            )
            .then(
                function(data) {
                    setUserInfo(data["users"][0])
                    setUsers(data["users"])
                    setTheme(data["users"][0]["themePref"])
                    setArticles(data["users"][0]["articles"])
                    setLayout(data["users"][0]["layoutPref"])
                    setIsLoading(false)
                }
            )
            .catch(
                function(err) {
                    console.log(err)
                }
            )
    }, []) 

    return (
        <BrowserRouter>
                <Routes>
                    {/* Home */}
                    {/* Need to revise first condition to include user data if logged in */}
                    <Route path={"/"}  element={
                        isLoading ?
                            <div className={"App dark-accent"}>
                                <Header theme="dark" title="BlogDog - Simple CMS" />
                                <Loading />
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
                                <Header userInfo={userInfo} theme={users[keyName]["themePref"]} title={users[keyName]["blogTitle"]} />
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
                        <div className={"App dark-accent"}>
                            <Header userInfo={userInfo} theme={"dark"} title={"BlogDog - Simple CMS"} />
                            <Logout />
                            <Footer theme={"dark"} />
                        </div>
                    } />

                    {/* Options */}
                    <Route path="/options" element={
                        <div className={"App dark-accent"}>
                            <Header userInfo={userInfo} theme={"dark"} title={"BlogDog - Simple CMS"} />
                            <Options userInfo={userInfo} theme={"dark"} />
                            <Footer theme={"dark"} />
                        </div>
                    } />

                    {/* User Profile Pages */}
                    {Object.keys(users).map((keyName, index) =>
                        <Route key={index} path={"/" + users[keyName]["profileName"] + "/profile"} element={
                            <div className={"App " + users[keyName]["themePref"] + "-accent"}>
                                <Header userInfo={userInfo} theme={users[keyName]["themePref"]} title={users[keyName]["blogTitle"]} />
                                <User userInfo={users[keyName]} articles={articles} theme={users[keyName]["themePref"]} />
                                <Footer theme={users[keyName]["themePref"]} />
                            </div>
                        } />
                    )}

                    {/* Compose */}
                    <Route path={"/compose"} element={
                        <div className={"App " + theme.accent}>
                            <Header userInfo={userInfo} theme={theme} title={userInfo["blogTitle"]} />
                            <Compose userInfo={userInfo} theme={theme} articles={articles} />
                            <Footer theme={theme} />
                        </div>
                    } />

                    {/* Articles for Each User */}
                    {Object.keys(users).map((keyName, index) =>
                        Object.values(articles).map((val, thisIndex) =>
                            <Route key={thisIndex} path={"/" + users[keyName]["profileName"] + "/" + thisIndex} element={
                                <div className={"App " + users[keyName]["themePref"] + "-accent"}>
                                    <Header userInfo={userInfo} theme={users[keyName]["themePref"]} title={users[keyName]["blogTitle"]} />
                                    <Main userInfo={users[keyName]} landing={false} index={thisIndex} articles={users[keyName]["articles"]} theme={users[keyName]["themePref"]} layout={users[keyName]["layoutPref"]} />
                                    <Footer theme={users[keyName]["themePref"]} />
                                </div>
                            } /> 
                        )
                    )}
                </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
