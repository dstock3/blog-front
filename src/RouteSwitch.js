import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Main from './components/Main';
import User from './components/User';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer'
import './App.css';
import Data from './sampleData.json'

const RouteSwitch = () => {
    const [userInfo, setUserInfo] = useState(Data.user)
    const [articles, setArticles] = useState(Data.articles)
    const [theme, setTheme] = useState({"main": Data.user["theme-pref"], "accent": (Data.user["theme-pref"] + "-accent")})
    const [layout, setLayout] = useState({"main": Data.user["layout-pref"], "child": (Data.user["layout-pref"] + "-child")})
    
    useEffect(() => {
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
                        <Route path="/" element={
                            <div className={"App " + theme.accent}>
                                <Header theme={theme} title={userInfo["blog-title"]} />
                                <Main userInfo={userInfo} articles={articles} theme={theme} layout={layout} />
                                <Footer theme={theme} />
                            </div>
                        } />
                        <Route path="/register" element={
                            <div className={"App " + theme.accent}>
                                <Header theme={theme} title={userInfo["blog-title"]} />
                                <Register />
                                <Footer theme={theme} />
                            </div>
                        } />
                        <Route path="/login" element={
                            <div className={"App " + theme.accent}>
                                <Header theme={theme} title={userInfo["blog-title"]} />
                                <Login />
                                <Footer theme={theme} />
                            </div>
                        } />
                        <Route path={"/" + userInfo["profile-name"]} element={
                            <div className={"App " + theme.accent}>
                                <Header theme={theme} title={userInfo["blog-title"]} />
                                <User userInfo={userInfo} theme={theme} />
                                <Footer theme={theme} />
                            </div>
                        } />
                </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;
