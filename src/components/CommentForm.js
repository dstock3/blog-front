import Prompt from "./Prompt";

const CommentForm = ({userInfo, theme}) => {
    if (userInfo) {
        return (
            <form className={"comment-form " + theme.accent} action="" method="POST">
                <div className="comment-subcontainer comment-prompt">
                    <label className="comment-label" for="comment">Leave a Comment Below:</label>
                    <input className="comment-title-input" type="text" for="comment"></input>
                </div>
            </form>
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default CommentForm;