import Prompt from './Prompt';
import Sidebar from './Sidebar';
import '../style/compose.css'

const Compose = ({userInfo, articles, theme}) => {
    if (userInfo) {
        return (
            <main className={"compose-page " + theme.main}>
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />

                <form className="composeForm" action="" method="POST">
                    <div className="compose-subcontainer compose-title">
                        <label className="compose-label" for="title">Title:</label>
                        <input className="compose-title-input" type="text" for="title"></input>
                    </div>

                    <div className="compose-subcontainer compose-body">
                        <label className="compose-label"for="content">Content:</label>
                        <textarea className="compose-content-input" type="text" for="content" rows="25"></textarea>
                    </div>

                    <div className="compose-subcontainer compose-options">
                        <button className="submit-btn">Submit</button>
                    </div>
                </form>
            </main>
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default Compose;