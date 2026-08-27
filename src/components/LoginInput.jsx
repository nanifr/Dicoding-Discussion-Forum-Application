import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <form className="login-input" onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={onEmailChange} placeholder="Email" required />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Kata sandi" required />
      <button type="submit">Masuk</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
