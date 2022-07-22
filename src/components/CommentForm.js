import { useEffect, useState } from "react";
import Prompt from "./Prompt";

const CommentForm = ({userInfo, articleId, theme}) => {
    const [comment, setComment] = useState("")
    const [message, setMessage] = useState("")

    const commentHandler = async(e) => {
        e.preventDefault();
        
        try {
            let token = localStorage.getItem('user');
            
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`, {
                method: "POST",
                body: JSON.stringify({
                    userId: userInfo._id,
                    articleId: articleId,
                    comment: comment
                    }),
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setComment("");
                setMessage("Comment has been posted");
            } else {
                setMessage("Some error occured");
            }
        } catch(err) {
            setMessage("Some error occured");
            console.log(err);
        }
        
    }
    
    if (userInfo) {
        return (
            <form onSubmit={commentHandler} className={"comment-form " + theme + "-accent"} action="" method="POST">
                <div className="comment-subcontainer comment-prompt">
                    <label className="comment-label" htmlFor="comment">Leave a Comment Below:</label>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
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