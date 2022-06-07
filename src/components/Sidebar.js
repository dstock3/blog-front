import Profile from './Profile'
import Archive from './Archive'

const Sidebar = ({articles, userInfo}) => {
    return (
        <div className="sidebar">
            <Profile userInfo={userInfo} />
            <Archive articles={articles} />
        </div>
    );
}

export default Sidebar;