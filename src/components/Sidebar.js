import Profile from './Profile'
import Archive from './Archive'
import '../style/sidebar.css'
import { Link } from 'react-router-dom';
import Intro from './Intro';
import CommentedArticles from './CommentedArticles';

const Sidebar = ({isLoggedIn, articles, userInfo, theme, isHome, fetchArticle}) => {
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
                <Archive userInfo={userInfo} articles={articles} fetchArticle={fetchArticle}/>
                <CommentedArticles theme={theme} fetchArticle={fetchArticle}/>
            </div>
        );
    }

}

export default Sidebar;