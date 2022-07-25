import { useEffect, useState } from "react";
import { parseJwt } from "../auth/parseToken";

const Comment = ({comment, articleAuthor, articleId}) => {
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
                console.log(resJson)
                window.location.reload();
            } else {
                console.log(resJson)
                setMessage("Some error occurred")
            }
        } catch(err) {
            console.log(err);
            setMessage("Some error occurred")
        }
    }

    return (
        <li className="comment">
            <div className="message">{message ? <p>{message}</p> : null}</div>
            <div className="comment-primary-container">
                <span className="comment-username">{comment.profileName}:</span>
                <span className="comment-content">{comment.content}</span> 
            </div>
            {authorized ?
                <div className="comment-dashboard">
                    <button onClick={editComment}>Edit</button>
                    <button onClick={deleteComment}>Delete</button>
                </div> : null
            }
        </li>
    );
}

export default Comment;