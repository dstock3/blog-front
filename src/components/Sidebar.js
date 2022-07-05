import Profile from './Profile'
import Archive from './Archive'
import '../style/sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = ({articles, userInfo, theme}) => {
    return (
        <div className={"sidebar " + theme}>
            <Profile mode={"prof-side"} userInfo={userInfo} />
            
            <div className="compose-option">
                <Link to = {"/" + userInfo["profileName"] + "/compose"}>
                    Compose New Blog
                </Link>
            </div>

            <Archive userInfo={userInfo} articles={articles} />
        </div>
    );
}

export default Sidebar;