import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import VoteButton from './VoteButton';
import { postedAt, truncateText } from '../utils';

function ThreadItem({
  id, title, body, category, createdAt, totalComments,
  upVotesBy, downVotesBy,
  ownerName, ownerAvatar, authUserId, onUpVote, onDownVote,
}) {
  const navigate = useNavigate();
  const isUpVoted = upVotesBy.includes(authUserId);
  const isDownVoted = downVotesBy.includes(authUserId);

  function goToDetail() {
    navigate(`/threads/${id}`);
  }

  function onKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      goToDetail();
    }
  }

  function handleUpVote(event) {
    event.stopPropagation();
    onUpVote(id);
  }

  function handleDownVote(event) {
    event.stopPropagation();
    onDownVote(id);
  }

  return (
    <article role="button" tabIndex={0} className="thread-item" onClick={goToDetail} onKeyDown={onKeyPress}>
      <header className="thread-item__header">
        {category && <span className="thread-item__category">{`#${category}`}</span>}
        <span className="thread-item__created-at">{postedAt(createdAt)}</span>
      </header>
      <h3 className="thread-item__title">{title}</h3>
      <p className="thread-item__body">{truncateText(body, 160)}</p>
      <footer className="thread-item__footer">
        <div className="thread-item__owner">
          <img src={ownerAvatar} alt={ownerName} />
          <span>{ownerName}</span>
        </div>
        <div className="thread-item__stats">
          <VoteButton
            upVotesCount={upVotesBy.length}
            downVotesCount={downVotesBy.length}
            isUpVoted={isUpVoted}
            isDownVoted={isDownVoted}
            onUpVote={handleUpVote}
            onDownVote={handleDownVote}
          />
          <span className="thread-item__comments">
            <IoChatbubbleEllipsesOutline />
            {totalComments}
          </span>
        </div>
      </footer>
    </article>
  );
}

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  ownerName: PropTypes.string.isRequired,
  ownerAvatar: PropTypes.string,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = {
  category: '',
  ownerAvatar: '',
  authUserId: null,
};

export { threadItemShape };

export default ThreadItem;
