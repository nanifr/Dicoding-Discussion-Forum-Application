import React, { useEffect } from 'react';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onLogin = async ({ email, password }) => {
    const isSuccess = await dispatch(asyncSetAuthUser({ email, password }));

    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1><IoChatbubblesOutline /></h1>
      </header>
      <article className="login-page__main">
        <h2>
          Diskusi, Berbagi <br /> Cerita, dan Ide.
        </h2>
        <LoginInput login={onLogin} />
        <p>
          Belum punya akun?
          {' '}
          <Link to="/register">Daftar</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
