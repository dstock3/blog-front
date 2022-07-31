import { useEffect, useState } from "react";
import { parseJwt } from "../auth/parseToken";

const Comment = ({ comment, articleAuthor, articleId, setUpdate, theme }) => {
    const [message, setMessage] = useState("")
    const [authorizedToDelete, setAuthorizedToDelete] = useState(false)
    const [fullyAuthorized, setFullyAuthorized] = useState(false)

    useEffect(()=> {
        let thisUser = parseJwt(localStorage.getItem('user'))

        //if the user is the author of both the article and the comment itself, authorize to delete and edit
        if (thisUser._id === articleAuthor._id && thisUser._id === comment.userId) {
            setFullyAuthorized(true) 
        } else if (thisUser._id === articleAuthor._id) { 
            //if the user is the author of the article, authorize to delete
            setAuthorizedToDelete(true)
        } else if (thisUser._id === comment.userId) {
            //if user is author of the comment itself, authorize to delete and edit
            setFullyAuthorized(true)
        } else {
            setFullyAuthorized(false)
            setAuthorizedToDelete(false)
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
                    {authorizedToDelete ?
                        <div className={"comment-edit-btn " + theme + "-accent"} onClick={deleteComment}>Delete</div> : null}
                    {fullyAuthorized ?
                        <>
                            <div className={"comment-edit-btn " + theme + "-accent"} onClick={editComment}>Edit</div>
                            <div className={"comment-edit-btn " + theme + "-accent"} onClick={deleteComment}>Delete</div>
                        </> : null
                    }
                </div>
            </li>
        </>

    );
}

export default Comment;