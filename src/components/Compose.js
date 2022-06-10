import Prompt from './Prompt';
import Sidebar from './Sidebar'

const Compose = ({userInfo, articles, theme}) => {
    if (userInfo) {
        return (
            <main className={"compose-page" + theme.main}>
                <Sidebar userInfo={userInfo} articles={articles} theme={theme} />

                <form action="" method="POST">
                    <div className="compose-title-container">
                        <label for="title">Title:</label>
                        <input type="text" for="title"></input>
                    </div>

                    <div className="compose-body-container">
                        <label for="content">Content:</label>
                        <textarea type="text" for="content"></textarea>
                    </div>

                    <div className="compose-options">
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