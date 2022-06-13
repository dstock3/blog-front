import Archive from "./Archive";
import Profile from "./Profile";

const User = ({userInfo, articles, theme}) => {
    return (
        <div className={"user " + theme.main}>
            <Profile mode={"prof-main"} userInfo={userInfo} />
            <Archive userInfo={userInfo} articles={articles} />
        </div>
    );
}

export default User;