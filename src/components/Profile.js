import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({userInfo, mode}) => {
    const [thisClass, setThisClass] = useState({picContainer: null, pic: null})

    useEffect(()=> {
        if (mode === "prof-main") {
            setThisClass({picContainer: "main-pic-container", pic: "main-pic"})
        }
    }, [mode])

    return (
        <div className="profile" id={mode}> 
            <div className={"profile-pic-container " + thisClass.picContainer}>
                <img className={"profile-pic " + thisClass.pic} src={userInfo["profile-pic"]} alt={"profile-pic for " + userInfo["profile-name"]}></img>
            </div>
            <div className="profile-info">
                <h2 className="profile-name">
                    {mode === "prof-side" ?
                        <Link to = {{pathname: '/' + userInfo["profile-name"]}}>
                            {userInfo["profile-name"]}
                        </Link> :
                        userInfo["profile-name"]
                    }
                </h2>
                <div className="profile-desc">{userInfo["profile-desc"]}</div>
            </div>
        </div>
    );
}

export default Profile;