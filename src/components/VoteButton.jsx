import React from 'react';
import PropTypes from 'prop-types';
import { IoArrowUpCircle, IoArrowUpCircleOutline, IoArrowDownCircle, IoArrowDownCircleOutline } from 'react-icons/io5';

function VoteButton({
  upVotesCount, downVotesCount, isUpVoted, isDownVoted, onUpVote, onDownVote,
}) {
  return (
    <div className="vote-button">
      <button
        type="button"
        aria-label="up vote"
        className={isUpVoted ? 'vote-button__up vote-button__up--active' : 'vote-button__up'}
        onClick={onUpVote}
      >
        {isUpVoted ? <IoArrowUpCircle /> : <IoArrowUpCircleOutline />}
        <span>{upVotesCount}</span>
      </button>
      <button
        type="button"
        aria-label="down vote"
        className={isDownVoted ? 'vote-button__down vote-button__down--active' : 'vote-button__down'}
        onClick={onDownVote}
      >
        {isDownVoted ? <IoArrowDownCircle /> : <IoArrowDownCircleOutline />}
        <span>{downVotesCount}</span>
      </button>
    </div>
  );
}

VoteButton.propTypes = {
  upVotesCount: PropTypes.number.isRequired,
  downVotesCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default VoteButton;
