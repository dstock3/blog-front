import Profile from './Profile'
import Archive from './Archive'
import '../style/sidebar.css'
import { Link } from 'react-router-dom';
import Intro from './Intro';
import CommentedArticles from './CommentedArticles';

const Sidebar = ({articles, userInfo, theme, isHome}) => {
    if (isHome) {
        return (
            <div className={"sidebar " + theme}>
                {userInfo ? 
                    <>
                        <Profile mode="prof-side" isHome={isHome} userInfo={userInfo} />
                        <Link className="compose-link" to="/compose">Compose New Article</Link>
                        <CommentedArticles />
                    </> : 
                    <>
                        <Intro theme={theme}/>
                        <CommentedArticles />
                    </>
                }
            </div>
        );
    } else {
        return (
            <div className={"sidebar " + theme}>
                <Profile mode="prof-side" userInfo={userInfo} />
                <Archive userInfo={userInfo} articles={articles} />
                <CommentedArticles />
            </div>
        );
    }

}

export default Sidebar;