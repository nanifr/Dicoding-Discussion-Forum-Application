import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

/**
 * skenario testing:
 * - VoteButton component
 *   - should display the up-vote and down-vote counts correctly
 *   - should not mark either button as active when isUpVoted and
 *     isDownVoted are both false
 *   - should mark the up-vote button as active when isUpVoted is true
 *   - should mark the down-vote button as active when isDownVoted is true
 *   - should call the onUpVote handler when the up-vote button is clicked
 *   - should call the onDownVote handler when the down-vote button is
 *     clicked
 */

describe('VoteButton component', () => {
  const defaultProps = {
    upVotesCount: 3,
    downVotesCount: 1,
    isUpVoted: false,
    isDownVoted: false,
    onUpVote: () => {},
    onDownVote: () => {},
  };

  it('should display the up-vote and down-vote counts correctly', () => {
    // arrange
    render(<VoteButton {...defaultProps} />);

    // assert
    expect(screen.getByLabelText('up vote')).toHaveTextContent('3');
    expect(screen.getByLabelText('down vote')).toHaveTextContent('1');
  });

  it('should not mark either button as active when isUpVoted and isDownVoted are both false', () => {
    // arrange
    render(<VoteButton {...defaultProps} />);

    // assert
    expect(screen.getByLabelText('up vote')).not.toHaveClass('vote-button__up--active');
    expect(screen.getByLabelText('down vote')).not.toHaveClass('vote-button__down--active');
  });

  it('should mark the up-vote button as active when isUpVoted is true', () => {
    // arrange
    render(<VoteButton {...defaultProps} isUpVoted />);

    // assert
    expect(screen.getByLabelText('up vote')).toHaveClass('vote-button__up--active');
  });

  it('should mark the down-vote button as active when isDownVoted is true', () => {
    // arrange
    render(<VoteButton {...defaultProps} isDownVoted />);

    // assert
    expect(screen.getByLabelText('down vote')).toHaveClass('vote-button__down--active');
  });

  it('should call the onUpVote handler when the up-vote button is clicked', async () => {
    // arrange
    const user = userEvent.setup();
    const onUpVote = vi.fn();
    render(<VoteButton {...defaultProps} onUpVote={onUpVote} />);

    // action
    await user.click(screen.getByLabelText('up vote'));

    // assert
    expect(onUpVote).toHaveBeenCalledTimes(1);
  });

  it('should call the onDownVote handler when the down-vote button is clicked', async () => {
    // arrange
    const user = userEvent.setup();
    const onDownVote = vi.fn();
    render(<VoteButton {...defaultProps} onDownVote={onDownVote} />);

    // action
    await user.click(screen.getByLabelText('down vote'));

    // assert
    expect(onDownVote).toHaveBeenCalledTimes(1);
  });
});
