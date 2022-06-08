import Settings from "./Settings";

const Header = ({theme, title}) => {
    return (
        <header className={theme.main}>
            <h1 className="title">{title}</h1>
            <Settings theme={theme} /> 
        </header>
    );
}

export default Header;