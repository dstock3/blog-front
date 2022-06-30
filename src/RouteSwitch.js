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

const RouteSwitch = () => {
    //States will need to be updated via api call. Should be set as false by default.
    const [userInfo, setUserInfo] = useState(Data.users.user)
    const [articles, setArticles] = useState(Data.users.user["articles"])
    const [theme, setTheme] = useState(Data.users.user["theme-pref"])
    const [layout, setLayout] = useState({"main": Data.users.user["layout-pref"], "child": (Data.users.user["layout-pref"] + "-child")})
    const [users, setUsers] = useState(Data.users)
    
    useEffect(() => {
        //Will need to employ after api call once set up
        document.title = Data.users.user["blog-title"]
  
    }, [])
  
    /* 
    useEffect(()=> {
      let apiCall = ``
  
      fetch(apiCall)
        .then(
            function(response) {
                return response.json()
            }
        )
        .then(
            function(data) {
  
            }
        )
        .catch(
            function(err) {
                console.log(err)
            }
        )
    }, []) 
    */

    return (
        <BrowserRouter>
                <Routes>
                        {/* Index */}
                        <Route path="/" element={
                            <div className={"App " + theme + "-accent"}>
                                <Header theme={theme} title={userInfo["blog-title"]} />
                                <Main home={true} userInfo={userInfo} index={false} articles={articles} theme={theme} layout={layout} />
                                <Footer theme={theme} />
                            </div>
                        } />
                        
                        {/* Register */}
                        <Route path="/register" element={
                            <div className={"App dark-accent"}>
                                <Header theme={"dark"} title={"BlogDog - Simple CMS"} />
                                <Register theme={"dark"} />
                                <Footer theme={"dark"} />
                            </div>
                        } />

                        {/* Login */}
                        <Route path="/login" element={
                            <div className={"App dark-accent"}>
                                <Header theme={{"main": "dark", "accent": "dark-accent"}} title={"BlogDog - Simple CMS"} />
                                <Login theme={{"main": "dark", "accent": "dark-accent"}} />
                                <Footer theme={{"main": "dark", "accent": "dark-accent"}} />
                            </div>
                        } />

                        {/* User Profiles */}
                        {Object.keys(users).map((keyName, index) =>
                            <Route key={index} path={"/" + users[keyName]["profile-name"]} element={
                                <div className={"App " + users[keyName]["theme-pref"] + "-accent"}>
                                    <Header theme={users[keyName]["theme-pref"]} title={users[keyName]["blog-title"]} />
                                    <User userInfo={users[keyName]} articles={articles} theme={users[keyName]["theme-pref"]} />
                                    <Footer theme={users[keyName]["theme-pref"]} />
                                </div>
                            } />
                        )}

                        {/* Compose */}
                        <Route path={"/" + userInfo["profile-name"] + "/compose"} element={
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
                                        <Main userInfo={users[keyName]} home={false} index={thisIndex} articles={users[keyName]["articles"]} theme={users[keyName]["theme-pref"]} layout={users[keyName]["layout-pref"]} />
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
