const Comment = ({comment, key}) => {
    const editComment = async () => {

    }
    
    const deleteComment = async () => {

    }

    return (
        <li className="comment" key={key}>
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