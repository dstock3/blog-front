import Profile from './Profile'
import Archive from './Archive'

const Sidebar = ({articles, userInfo, theme}) => {
    return (
        <div className={"sidebar " + theme.main}>
            <Profile mode={"prof-side"} userInfo={userInfo} />
            <Archive articles={articles} />
        </div>
    );
}

export default Sidebar;