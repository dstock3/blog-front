import Profile from "./Profile";

const User = ({userInfo, theme}) => {
    return (
        <div className={"user " + theme.main}>
            <Profile mode={"prof-main"} userInfo={userInfo} />
        </div>
    );
}

export default User;