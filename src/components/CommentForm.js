import Prompt from "./Prompt";

const CommentForm = ({userInfo, theme}) => {
    if (userInfo) {
        return (
            <form className={"comment-form " + theme.accent} action="" method="POST">
                <div className="comment-subcontainer comment-prompt">
                    <label className="comment-label" for="comment">Leave a Comment Below:</label>
                    <textarea className="comment-input" type="text" for="comment"></textarea>
                </div>
                <div className="comment-btn-subcontainer">
                    <button className="comment-btn">Submit</button>
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