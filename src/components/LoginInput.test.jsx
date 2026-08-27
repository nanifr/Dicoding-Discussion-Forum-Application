import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

/**
 * skenario testing:
 * - LoginInput component
 *   - should display the email and password fields correctly
 *   - should update the email input value when the user types into it
 *   - should update the password input value when the user types into it
 *   - should call the login function with the typed email and password
 *     when the form is submitted
 *   - should not call the login function when the form has not been
 *     submitted
 */

describe('LoginInput component', () => {
  it('should display the email and password fields correctly', () => {
    // arrange
    render(<LoginInput login={() => {}} />);

    // assert
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Kata sandi')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument();
  });

  it('should update the email input value when the user types into it', async () => {
    // arrange
    const user = userEvent.setup();
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // action
    await user.type(emailInput, 'dimas@mail.com');

    // assert
    expect(emailInput).toHaveValue('dimas@mail.com');
  });

  it('should update the password input value when the user types into it', async () => {
    // arrange
    const user = userEvent.setup();
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Kata sandi');

    // action
    await user.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call the login function with the typed email and password when the form is submitted', async () => {
    // arrange
    const user = userEvent.setup();
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);

    // action
    await user.type(screen.getByPlaceholderText('Email'), 'dimas@mail.com');
    await user.type(screen.getByPlaceholderText('Kata sandi'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    // assert
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'dimas@mail.com',
      password: 'password123',
    });
  });

  it('should not call the login function when the form has not been submitted', () => {
    // arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);

    // assert
    expect(mockLogin).not.toHaveBeenCalled();
  });
});
