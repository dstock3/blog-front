import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Prompt from "./Prompt";
import { parseJwt } from "../auth/parseToken";

const CommentForm = ({users, userInfo, articleId, theme }) => {
    const [comment, setComment] = useState("")
    const [message, setMessage] = useState("")
    const [author, setAuthor] = useState("")
    const nav = useNavigate();

    useEffect(()=> {
        let newUser = localStorage.getItem('user');
        
        if (newUser) {
            let parsedUser = parseJwt(newUser)
            for (let prop in users) {
                if (users[prop]._id === parsedUser._id) {
                    let thisUser = users[prop]
                    setAuthor(thisUser)
                }   
            }
        }
    }, [])

    const commentHandler = async(e) => {
        e.preventDefault();
        
        try {
            let token = localStorage.getItem('user');
            
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}`, {
                method: "POST",
                body: JSON.stringify({
                    profileName: author.profileName,
                    userId: author._id,
                    content: comment
                    }),
                headers: { 'Content-Type': 'application/json', "login-token" : token }
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                setComment("");
                window.location.reload(false);
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