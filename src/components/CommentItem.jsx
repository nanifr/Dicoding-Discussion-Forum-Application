import React from 'react';
import PropTypes from 'prop-types';
import VoteButton from './VoteButton';
import { postedAt, getAvatarUrl } from '../utils';

function CommentItem({
  id, content, createdAt, owner, upVotesBy, downVotesBy, authUserId, onUpVote, onDownVote,
}) {
  const isUpVoted = upVotesBy.includes(authUserId);
  const isDownVoted = downVotesBy.includes(authUserId);

  return (
    <div className="comment-item">
      <img src={getAvatarUrl(owner)} alt={owner.name} className="comment-item__avatar" />
      <div className="comment-item__body">
        <header>
          <span className="comment-item__owner-name">{owner.name}</span>
          <span className="comment-item__created-at">{postedAt(createdAt)}</span>
        </header>
        <p className="comment-item__content">{content}</p>
        <VoteButton
          upVotesCount={upVotesBy.length}
          downVotesCount={downVotesBy.length}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  authUserId: null,
};

export { commentItemShape };

export default CommentItem;
