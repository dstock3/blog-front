import { Link } from "react-router-dom";
import Settings from "./Settings";

const Header = ({theme, title}) => {
    return (
        <header className={theme.main}>
                <h1 className="title">
                    <Link to = {{pathname: '/'}}>
                        {title}
                    </Link>
                </h1>

            <Settings theme={theme} /> 
        </header>
    );
}

export default Header;