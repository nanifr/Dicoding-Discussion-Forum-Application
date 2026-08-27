import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeaderboardsList from '../components/LeaderboardsList';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <h1>Papan Peringkat</h1>
      <LeaderboardsList leaderboards={leaderboards} />
    </section>
  );
}

export default LeaderboardPage;
