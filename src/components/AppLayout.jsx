import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

function AppLayout({ authUser, signOut }) {
  const location = useLocation();
  const hideNavigation = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="app-container">
      {!hideNavigation && (
        <header>
          <Navigation authUser={authUser} signOut={signOut} />
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

AppLayout.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  signOut: PropTypes.func.isRequired,
};

AppLayout.defaultProps = {
  authUser: null,
};

export default AppLayout;
