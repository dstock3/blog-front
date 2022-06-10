import Prompt from './Prompt';
import Sidebar from './Sidebar'

const Compose = ({userInfo, articles, theme}) => {
    if (userInfo) {
        return (
            <main className={"compose-page" + theme.main}>
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />

                
    
                
            </main>
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default Compose;