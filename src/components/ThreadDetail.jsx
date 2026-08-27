import React from 'react';
import PropTypes from 'prop-types';
import VoteButton from './VoteButton';
import { postedAt, getAvatarUrl } from '../utils';

function ThreadDetail({
  title, body, category, createdAt, owner, upVotesBy, downVotesBy,
  authUserId, onUpVote, onDownVote,
}) {
  const isUpVoted = upVotesBy.includes(authUserId);
  const isDownVoted = downVotesBy.includes(authUserId);

  return (
    <section className="thread-detail">
      <header>
        {category && <span className="thread-detail__category">{`#${category}`}</span>}
        <h1 className="thread-detail__title">{title}</h1>
        <div className="thread-detail__owner">
          <img src={getAvatarUrl(owner)} alt={owner.name} />
          <div>
            <p className="thread-detail__owner-name">{owner.name}</p>
            <p className="thread-detail__created-at">{postedAt(createdAt)}</p>
          </div>
        </div>
      </header>
      <article className="thread-detail__body">{body}</article>
      <footer>
        <VoteButton
          upVotesCount={upVotesBy.length}
          downVotesCount={downVotesBy.length}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </footer>
    </section>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadDetail.defaultProps = {
  category: '',
  authUserId: null,
};

export default ThreadDetail;
