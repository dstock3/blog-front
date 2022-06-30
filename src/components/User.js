import Archive from "./Archive";
import Profile from "./Profile";
import '../style/user.css'

const User = ({userInfo, articles, theme}) => {
    return (
        <div className={"user " + theme}>
            <Profile mode={"prof-main"} userInfo={userInfo} />
            <Archive mode={"archive-main"} userInfo={userInfo} articles={articles} />
        </div>
    );
}

export default User;