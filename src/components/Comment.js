const Comment = ({username, content, key}) => {
    return (
        <li className="comment" key={key}>
            <span className="comment-username">{username}:</span>
            <span className="comment-content">{content}</span> 
        </li>
    );
}

export default Comment;