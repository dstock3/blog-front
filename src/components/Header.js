import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings";

const Header = ({theme, title}) => {
    const [thisTheme, setThisTheme] = useState("light")

    useEffect(()=> {
        if (theme) {
            setThisTheme(theme.main)
        }
    }, [])
    
    return (
        <header className={thisTheme}>
                <h1 className="title">
                    {title ?
                        <Link to = {{pathname: '/'}}>{title}</Link> :
                        <Link to = {{pathname: '/'}}>BlogDog - Simple CMS</Link>
                    }
                </h1>
            <Settings theme={theme} /> 
        </header>
    );
}

export default Header;