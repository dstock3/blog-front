import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings";

const Header = ({userInfo, theme, title, profileName}) => {
    const [thisTheme, setThisTheme] = useState("light")

    useEffect(()=> {
        if (theme) {
            setThisTheme(theme)
        }
    }, [theme])
    
    return (
        <header className={thisTheme}>
            {userInfo ? <div className="welcome">{"Welcome "} 
                <Link to = {{pathname: `/${userInfo.profileName}`}} >
                    {userInfo.profileName}
                </Link>
            </div> : null}
            <h1 className="title">
                {title ?
                    <Link to = {{pathname: `/${profileName}`}}>{title}</Link> :
                    <Link to = {{pathname: '/'}}>BlogDog - Simple CMS</Link>
                }
            </h1>
            <Settings userInfo={userInfo} theme={theme} /> 
        </header>
    );
}

export default Header;