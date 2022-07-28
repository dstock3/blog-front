import Profile from './Profile'
import Archive from './Archive'
import '../style/sidebar.css'
import { Link } from 'react-router-dom';
import Intro from './Intro';
import CommentedArticles from './CommentedArticles';
import { useEffect } from 'react';


const Sidebar = ({isLoggedIn, articles, userInfo, theme, isHome}) => {
    useEffect(()=> {

    }, [userInfo])

    
    if (isHome) {
        return (
            <div className={"sidebar " + theme}>
                {isLoggedIn ? 
                    <>
                        <Profile mode="prof-side" isHome={isHome} userInfo={userInfo} />
                        <Link className="compose-link" to="/compose">Compose New Article</Link>
                        <CommentedArticles theme={theme} />
                    </> : 
                    <>
                        <Intro theme={theme}/>
                        <CommentedArticles theme={theme} />
                    </>
                }
            </div>
        );
    } else {
        return (
            <div className={"sidebar " + theme}>
                <Profile mode="prof-side" userInfo={userInfo} />
                <Archive userInfo={userInfo} articles={articles} />
                <CommentedArticles theme={theme} />
            </div>
        );
    }

}

export default Sidebar;