import React from 'react'
import Comment from './Comment'

const CommentSection = ({showComments, comments, expandComment, theme, userInfo, article, setCommentUpdate}) => {
  return (
    <>
    {showComments ? 
        Object.values(comments).map((comment, thisIndex) =>
            <Comment key={thisIndex} articleAuthor={userInfo} comment={comment} articleId={article._id} setUpdate={setCommentUpdate} theme={theme} />
        ) : 
        <div className="comment-icon-container">
            <img src={expandComment} className={"comment-icon " + theme} alt="expand comments icon"></img>

        </div>
    }
    </>
  )
}

export default CommentSection