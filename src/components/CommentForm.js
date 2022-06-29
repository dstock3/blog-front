import Prompt from "./Prompt";

const CommentForm = ({userInfo, theme}) => {
    if (userInfo) {
        return (
            <form className={"comment-form " + theme.accent}>
                
            </form>
        );
    } else {
        return (
            <Prompt />
        )
    }
}

export default CommentForm;