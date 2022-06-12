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
    const [userInfo, setUserInfo] = useState(Data.user)
    const [articles, setArticles] = useState(Data.articles)
    const [theme, setTheme] = useState({"main": Data.user["theme-pref"], "accent": (Data.user["theme-pref"] + "-accent")})
    const [layout, setLayout] = useState({"main": Data.user["layout-pref"], "child": (Data.user["layout-pref"] + "-child")})
    
    useEffect(() => {
        //Will need to employ after api call once set up
        document.title = Data.user["blog-title"]
  
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
                            <div className={"App " + theme.accent}>
                                <Header theme={theme} title={userInfo["blog-title"]} />
                                <Main userInfo={userInfo} index={false} articles={articles} theme={theme} layout={layout} />
                                <Footer theme={theme} />
                            </div>
                        } />
                        
                        {/* Register */}
                        <Route path="/register" element={
                            <div className={"App dark-accent"}>
                                <Header theme={{"main": "dark", "accent": "dark-accent"}} title={"BlogDog - Simple CMS"} />
                                <Register />
                                <Footer theme={{"main": "dark", "accent": "dark-accent"}} />
                            </div>
                        } />

                        {/* Login */}
                        <Route path="/login" element={
                            <div className={"App dark-accent"}>
                                <Header theme={{"main": "dark", "accent": "dark-accent"}} title={"BlogDog - Simple CMS"} />
                                <Login />
                                <Footer theme={{"main": "dark", "accent": "dark-accent"}} />
                            </div>
                        } />

                        {/* User Profile */}
                        <Route path={"/" + userInfo["profile-name"]} element={
                            <div className={"App " + theme.accent}>
                                <Header theme={theme} title={userInfo["blog-title"]} />
                                <User userInfo={userInfo} theme={theme} />
                                <Footer theme={theme} />
                            </div>
                        } />

                        {/* Compose */}
                        <Route path={"/" + userInfo["profile-name"] + "/compose"} element={
                            <div className={"App " + theme.accent}>
                                <Header theme={theme} title={userInfo["blog-title"]} />
                                <Compose userInfo={userInfo} theme={theme} articles={articles} />
                                <Footer theme={theme} />
                            </div>
                        } />

                        {/* Articles */}
                        {Object.values(articles).map((val, index) => 
                            <Route key={index} path={"/" + userInfo["profile-name"] + "/" + index} element={
                                <div className={"App " + theme.accent}>
                                    <Header theme={theme} title={userInfo["blog-title"]} />
                                    <Main userInfo={userInfo} index={index} articles={articles} theme={theme} layout={layout} />
                                    <Footer theme={theme} />
                                </div>
                            } />
                        )}
                </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
