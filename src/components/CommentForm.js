import { useState } from "react";
import Prompt from "./Prompt";

const CommentForm = ({userInfo, theme}) => {
    const [comment, setComment] = useState("")

    const commentHandler = async(e) => {
        e.preventDefault();
        try {

        } catch(err) {

        }

    }
    
    if (userInfo) {
        return (
            <form onSubmit={commentHandler} className={"comment-form " + theme + "-accent"} action="" method="POST">
                <div className="comment-subcontainer comment-prompt">
                    <label className="comment-label" htmlFor="comment">Leave a Comment Below:</label>
                    <textarea className="comment-input" type="text" value={comment} htmlFor="comment" onChange={(e) => setComment(e.target.value)}></textarea>
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