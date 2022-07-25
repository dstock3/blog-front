import { useEffect } from "react";

const Comment = ({comment, articleId}) => {
    useEffect(()=> {
        console.log(comment)

    }, [])

    const editComment = async () => {

    }
    
    const deleteComment = async () => {
        try {
            let res = await fetch(`https://stormy-waters-34046.herokuapp.com/article/${articleId}/${comment._id}`, {
                method: "DELETE"
                });
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log(resJson)

            } else {

            }
        } catch(err) {

            console.log(err);
        }


    }

    return (
        <li className="comment">
            <div className="comment-primary-container">
                <span className="comment-username">{comment.profileName}:</span>
                <span className="comment-content">{comment.content}</span> 
            </div>
            <div className="comment-dashboard">
                <button onClick={editComment}>Edit</button>
                <button onClick={deleteComment}>Delete</button>
            </div>
        </li>
    );
}

export default Comment;