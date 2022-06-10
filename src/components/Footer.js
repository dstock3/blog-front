const Footer = ({theme}) => {
    return (
        <footer className={theme.main}>
            <div className="attribution">
                BlogDog CMS was created by David Stockdale.
            </div>
            <div className="social-links">
                <a href="https://github.com/dstock3" target="_blank" rel="noopener noreferrer">Github</a>
                <a href="https://davestockdale.io/" target="_blank" rel="noopener noreferrer">Portfolio</a>
            </div>
        </footer>
    );
}

export default Footer;