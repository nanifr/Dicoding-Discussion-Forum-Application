import React, { useEffect } from 'react';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const { authUser = null } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onRegister = async ({ name, email, password }) => {
    const isSuccess = await dispatch(asyncRegisterUser({ name, email, password }));

    if (isSuccess) {
      navigate('/login');
    }
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1><IoChatbubblesOutline /></h1>
      </header>
      <article className="register-page__main">
        <h2>Buat akun baru</h2>
        <RegisterInput register={onRegister} />
        <p>
          Sudah punya akun?
          {' '}
          <Link to="/login">Masuk</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
