import Settings from "./Settings";

const Header = ({theme}) => {
    return (
        <header className={theme.main}>
            <Settings theme={theme} />

            
        </header>
    );
}

export default Header;