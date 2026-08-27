import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { asyncUpVoteThread, upVoteThreadActionCreator, neutralizeVoteThreadActionCreator } from './action';
import api from '../../utils/api';

vi.mock('../../utils/api');

/**
 * skenario testing:
 * - asyncUpVoteThread thunk
 *   - should optimistically dispatch upVoteThreadActionCreator and call
 *     api.upVoteThread when the thread has not been up-voted yet by the user
 *   - should optimistically dispatch upVoteThreadActionCreator (toggle off)
 *     and call api.neutralizeThreadVote when the thread has already been
 *     up-voted by the user
 *   - should roll back the optimistic update by dispatching
 *     neutralizeVoteThreadActionCreator and show an alert with the error
 *     message when the API call fails
 */

describe('asyncUpVoteThread thunk', () => {
  const authUser = { id: 'users-1', name: 'Dimas' };

  beforeEach(() => {
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('should optimistically dispatch upVoteThreadActionCreator and call api.upVoteThread when the thread has not been up-voted yet by the user', async () => {
    // arrange
    const threads = [
      { id: 'thread-1', upVotesBy: [], downVotesBy: [] },
    ];
    const getState = vi.fn(() => ({ authUser, threads }));
    const dispatch = vi.fn();
    api.upVoteThread.mockResolvedValueOnce();

    // action
    await asyncUpVoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      upVoteThreadActionCreator({ threadId: 'thread-1', userId: authUser.id }),
    );
    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
    expect(api.neutralizeThreadVote).not.toHaveBeenCalled();
  });

  it('should optimistically dispatch upVoteThreadActionCreator (toggle off) and call api.neutralizeThreadVote when the thread has already been up-voted by the user', async () => {
    // arrange
    const threads = [
      { id: 'thread-1', upVotesBy: [authUser.id], downVotesBy: [] },
    ];
    const getState = vi.fn(() => ({ authUser, threads }));
    const dispatch = vi.fn();
    api.neutralizeThreadVote.mockResolvedValueOnce();

    // action
    await asyncUpVoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      upVoteThreadActionCreator({ threadId: 'thread-1', userId: authUser.id }),
    );
    expect(api.neutralizeThreadVote).toHaveBeenCalledWith('thread-1');
    expect(api.upVoteThread).not.toHaveBeenCalled();
  });

  it('should roll back the optimistic update by dispatching neutralizeVoteThreadActionCreator and show an alert with the error message when the API call fails', async () => {
    // arrange
    const threads = [
      { id: 'thread-1', upVotesBy: [], downVotesBy: [] },
    ];
    const getState = vi.fn(() => ({ authUser, threads }));
    const dispatch = vi.fn();
    api.upVoteThread.mockRejectedValueOnce(new Error('Gagal memberi vote'));

    // action
    await asyncUpVoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      upVoteThreadActionCreator({ threadId: 'thread-1', userId: authUser.id }),
    );
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: authUser.id }),
    );
    expect(window.alert).toHaveBeenCalledWith('Gagal memberi vote');
  });
});
