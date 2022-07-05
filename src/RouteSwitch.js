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
import Data from './sampleData.json'
import Home from './components/Home';

const RouteSwitch = () => {
    //States will need to be updated via api call. Should be set as false by default.
    const [userInfo, setUserInfo] = useState(Data.users.user)
    const [articles, setArticles] = useState(Data.users.user["articles"])
    const [theme, setTheme] = useState(Data.users.user["theme-pref"])
    const [layout, setLayout] = useState({"main": Data.users.user["layout-pref"], "child": (Data.users.user["layout-pref"] + "-child")})
    const [users, setUsers] = useState(Data.users)
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        //Will need to employ after api call once set up
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
                console.log(data["users"][0]["themePref"])
                setUserInfo(data["users"][0])
                setUsers(data["users"])
                setTheme(data["users"][0]["themePref"])
                setArticles(data["users"][0]["articles"])
                setLayout({"main": data["users"][0]["layoutPref"], "child": (data["users"][0]["layoutPref"] + "-child")})
                
  
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
                    <Route path={"/"}  element={
                        isLoggedIn ?
                            <div className={"App dark-accent"}>
                                <Header theme="dark" title="BlogDog - Simple CMS" />
                                <Home theme="dark" users={users} />
                                <Footer theme="dark" />
                            </div> :
                            <div className={"App dark-accent"}>
                                <Header theme="dark" title="BlogDog - Simple CMS" />
                                <Home theme="dark" users={users} />
                                <Footer theme="dark" />
                            </div>    
                    } />
                    
                    {/* Landing Pages for Each User */}
                    {Object.keys(users).map((keyName, index) =>
                        <Route path={"/" + users[keyName]["profileName"]}  element={
                            <div className={"App " + users[keyName]["themePref"] + "-accent"}>
                                <Header theme={users[keyName]["themePref"]} title={users[keyName]["blogTitle"]} />
                                <Main landing={true} userInfo={users[keyName]} index={false} articles={users[keyName]["articles"]} theme={users[keyName]["layoutPref"]} layout={users[keyName]["layoutPref"]} />
                                <Footer theme={users[keyName]["themePref"]} />
                            </div>
                        } />
                    )}

                    {/* Register */}
                    <Route path="/register" element={
                        <div className={"App dark-accent"}>
                            <Header theme={"dark"} title={"BlogDog - Simple CMS"} />
                            <Register />
                            <Footer theme={"dark"} />
                        </div>
                    } />

                    {/* Login */}
                    <Route path="/login" element={
                        <div className={"App dark-accent"}>
                            <Header theme={"dark"} title={"BlogDog - Simple CMS"} />
                            <Login />
                            <Footer theme={"dark"} />
                        </div>
                    } />

                    {/* User Profile Pages */}
                    {Object.keys(users).map((keyName, index) =>
                        <Route key={index} path={"/" + users[keyName]["profile-name"] + "/profile"} element={
                            <div className={"App " + users[keyName]["theme-pref"] + "-accent"}>
                                <Header theme={users[keyName]["theme-pref"]} title={users[keyName]["blog-title"]} />
                                <User userInfo={users[keyName]} articles={articles} theme={users[keyName]["theme-pref"]} />
                                <Footer theme={users[keyName]["theme-pref"]} />
                            </div>
                        } />
                    )}

                    {/* Compose */}
                    <Route path={"/compose"} element={
                        <div className={"App " + theme.accent}>
                            <Header theme={theme} title={userInfo["blog-title"]} />
                            <Compose userInfo={userInfo} theme={theme} articles={articles} />
                            <Footer theme={theme} />
                        </div>
                    } />

                    {/* Articles for Each User */}
                    {Object.keys(users).map((keyName, index) =>
                        Object.values(articles).map((val, thisIndex) =>
                            <Route key={thisIndex} path={"/" + users[keyName]["profile-name"] + "/" + thisIndex} element={
                                <div className={"App " + users[keyName]["theme-pref"] + "-accent"}>
                                    <Header theme={users[keyName]["theme-pref"]} title={users[keyName]["blog-title"]} />
                                    <Main userInfo={users[keyName]} landing={false} index={thisIndex} articles={users[keyName]["articles"]} theme={users[keyName]["theme-pref"]} layout={users[keyName]["layout-pref"]} />
                                    <Footer theme={users[keyName]["theme-pref"]} />
                                </div>
                            } /> 
                        )
                    )}
                </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
