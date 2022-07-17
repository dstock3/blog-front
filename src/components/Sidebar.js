import Profile from './Profile'
import Archive from './Archive'
import '../style/sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = ({articles, userInfo, theme, isHome}) => {
    if (isHome) {
        return (
            <div className={"sidebar " + theme}>
                {userInfo ? 
                    <>
                        <Profile mode="prof-side" isHome={isHome} userInfo={userInfo} />
                        <Link className="compose-link" to="/compose">Compose New Article</Link>
                    </> : 
                    <>
                        <div className="login-prompt">
                            <Link to="/login">Login</Link> to access CMS features.
                        </div>
                        <div className="register-prompt">
                            Don't have an account yet? <Link to="/register">Register</Link> to access features.
                        </div>
                    </>
                }
            </div>
        );
    } else {
        return (
            <div className={"sidebar " + theme}>
                <Profile mode="prof-side" userInfo={userInfo} />
                <Archive userInfo={userInfo} articles={articles} />
            </div>
        );
    }

}

export default Sidebar;