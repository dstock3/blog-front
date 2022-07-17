import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings";

const Header = ({user, userInfo, theme, title}) => {
    const [thisTheme, setThisTheme] = useState("light")

    useEffect(()=> {
        if (theme) {
            setThisTheme(theme)
        }
    }, [theme])
    
    return (
        <header className={thisTheme}>
            {user ? <div className="welcome">Welcome {user.profileName}</div> : null}
            <h1 className="title">
                {title ?
                    <Link to = {{pathname: '/'}}>{title}</Link> :
                    <Link to = {{pathname: '/'}}>BlogDog - Simple CMS</Link>
                }
            </h1>
            <Settings userInfo={userInfo} theme={theme} /> 
        </header>
    );
}

export default Header;