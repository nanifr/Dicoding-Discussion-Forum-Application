import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem';

function CommentsList({ comments, authUserId, onUpVote, onDownVote }) {
  if (comments.length === 0) {
    return <p className="comments-list__empty">Belum ada komentar. Jadilah yang pertama berkomentar!</p>;
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

CommentsList.defaultProps = {
  authUserId: null,
};

export default CommentsList;
