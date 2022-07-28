import { useEffect, useState } from "react";
import { parseJwt } from "../auth/parseToken";

const Comment = ({ comment, articleAuthor, articleId, setUpdate, theme }) => {
    const [message, setMessage] = useState("")
    const [authorized, setAuthorized] = useState(false)

    useEffect(()=> {
        let thisUser = parseJwt(localStorage.getItem('user'))

        //if the user is the author of either the article or the comment itself, authorize user.
        if ((thisUser._id === comment.userId) || (thisUser._id === articleAuthor._id)) {
            setAuthorized(true)
        }
    }, [])

    const editComment = async () => {
        setUpdate({"content": comment.content, "commentId": comment._id})
    }
    
    const deleteComment = async () => {
        let token = localStorage.getItem('user');

        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}/${comment._id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                window.location.reload();
            } else {

                setMessage("Some error occurred")
            }
        } catch(err) {
            console.log(err);
            setMessage("Some error occurred")
        }
    }

    return (
        <>
            {message ? <div className="message">{message}</div> : null }
            <li className={"comment " + theme}>
                <div className="comment-primary-container">
                    <span className="comment-username">{comment.profileName}:</span>
                    <span className="comment-content">{comment.content}</span> 
                </div>
                <div className="comment-dashboard">
                    {authorized ?
                        <>
                            <button className={"comment-edit-btn " + theme + "-accent"} onClick={editComment}>Edit</button>
                            <button className={"comment-edit-btn " + theme + "-accent"} onClick={deleteComment}>Delete</button>
                        </> : null
                    }
                </div>
            </li>
        </>

    );
}

export default Comment;