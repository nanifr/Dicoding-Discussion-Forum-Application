import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoChatbubblesOutline, IoTrophyOutline, IoAddCircleOutline } from 'react-icons/io5';
import { getAvatarUrl } from '../utils';

function Navigation({ authUser, signOut }) {
  return (
    <div className="navigation">
      <Link to="/" className="navigation__brand">
        <IoChatbubblesOutline />
        <span>Dicoding Thread Forum</span>
      </Link>
      <nav className="navigation__menu">
        <Link to="/leaderboards">
          <IoTrophyOutline />
          <span>Leaderboard</span>
        </Link>
        {authUser && (
          <Link to="/threads/new" className="navigation__new-thread">
            <IoAddCircleOutline />
            <span>Buat Thread</span>
          </Link>
        )}
      </nav>
      <div className="navigation__user">
        {authUser ? (
          <>
            <img src={getAvatarUrl(authUser)} alt={authUser.name} title={authUser.name} />
            <span className="navigation__user-name">{authUser.name}</span>
            <button type="button" onClick={signOut}>Keluar</button>
          </>
        ) : (
          <Link to="/login" className="navigation__login">Masuk</Link>
        )}
      </div>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  signOut: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;
