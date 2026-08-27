import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Konfirmasi kata sandi tidak sama');
      return;
    }

    register({ name, email, password });
  }

  return (
    <form className="register-input" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={onNameChange} placeholder="Nama lengkap" required />
      <input type="email" value={email} onChange={onEmailChange} placeholder="Email" required />
      <input type="password" value={password} onChange={onPasswordChange} placeholder="Kata sandi" required />
      <input type="password" value={confirmPassword} onChange={onConfirmPasswordChange} placeholder="Konfirmasi kata sandi" required />
      <button type="submit">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
