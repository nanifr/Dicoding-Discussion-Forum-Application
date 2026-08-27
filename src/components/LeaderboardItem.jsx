import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ rank, user, score }) {
  return (
    <div className="leaderboard-item">
      <span className="leaderboard-item__rank">{rank}</span>
      <img src={user.avatar} alt={user.name} className="leaderboard-item__avatar" />
      <span className="leaderboard-item__name">{user.name}</span>
      <span className="leaderboard-item__score">
        {score}
        {' '}
        poin
      </span>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
