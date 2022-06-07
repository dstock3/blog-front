const Profile = ({userInfo}) => {
    return (
        <div className="profile">
            <div className="profile-pic">
                <img></img>
            </div>
            <div className="profile-info">
                <h2 className="profile-name">{userInfo["profile-name"]}</h2>
                <div className="profile-desc">{userInfo["profile-desc"]}</div>
            </div>
        </div>
    );
}

export default Profile;