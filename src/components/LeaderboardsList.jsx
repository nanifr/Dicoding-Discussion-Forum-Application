import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardsList({ leaderboards }) {
  if (leaderboards.length === 0) {
    return <p className="leaderboards-list__empty">Papan peringkat belum tersedia.</p>;
  }

  return (
    <div className="leaderboards-list">
      {leaderboards.map((entry, index) => (
        <LeaderboardItem key={entry.user.id} rank={index + 1} user={entry.user} score={entry.score} />
      ))}
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape(userShape).isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default LeaderboardsList;
