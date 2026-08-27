import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

/**
 * skenario testing:
 * - threadsReducer function
 *   - should return the initial state (empty array) when given by unknown action
 *   - should return the previous state when given by unknown action
 *   - should return the threads from the action payload when given by RECEIVE_THREADS action
 *   - should place the new thread at the beginning of the list when given by ADD_THREAD action
 *   - should add userId to upVotesBy and remove it from downVotesBy when the thread
 *     has not been up-voted yet by the user, given by UP_VOTE_THREAD action
 *   - should remove userId from upVotesBy (toggle off) when the thread has already
 *     been up-voted by the user, given by UP_VOTE_THREAD action
 *   - should add userId to downVotesBy and remove it from upVotesBy when the thread
 *     has not been down-voted yet by the user, given by DOWN_VOTE_THREAD action
 *   - should remove userId from downVotesBy (toggle off) when the thread has already
 *     been down-voted by the user, given by DOWN_VOTE_THREAD action
 *   - should remove userId from both upVotesBy and downVotesBy when given by
 *     NEUTRALIZE_VOTE_THREAD action
 *   - should only update the thread that matches the given threadId and leave the
 *     other threads untouched
 */

const sampleThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2024-01-01T00:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'Random',
    createdAt: '2024-01-02T00:00:00.000Z',
    ownerId: 'users-2',
    upVotesBy: ['users-3'],
    downVotesBy: [],
    totalComments: 0,
  },
];

describe('threadsReducer function', () => {
  it('should return the initial state (empty array) when given by unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(undefined, action);

    // assert
    expect(nextState).toEqual([]);
  });

  it('should return the previous state when given by unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(sampleThreads, action);

    // assert
    expect(nextState).toBe(sampleThreads);
  });

  it('should return the threads from the action payload when given by RECEIVE_THREADS action', () => {
    // arrange
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: sampleThreads },
    };

    // action
    const nextState = threadsReducer([], action);

    // assert
    expect(nextState).toEqual(sampleThreads);
  });

  it('should place the new thread at the beginning of the list when given by ADD_THREAD action', () => {
    // arrange
    const newThread = {
      id: 'thread-3',
      title: 'Thread Baru',
      body: 'Konten thread baru',
      category: '',
      createdAt: '2024-01-03T00:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };

    // action
    const nextState = threadsReducer(sampleThreads, action);

    // assert
    expect(nextState).toHaveLength(3);
    expect(nextState[0]).toEqual(newThread);
  });

  it('should add userId to upVotesBy and remove it from downVotesBy when the thread has not been up-voted yet by the user', () => {
    // arrange
    const threads = [
      { id: 'thread-1', upVotesBy: [], downVotesBy: ['users-9'] },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-9' },
    };

    // action
    const nextState = threadsReducer(threads, action);

    // assert
    expect(nextState[0].upVotesBy).toEqual(['users-9']);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should remove userId from upVotesBy (toggle off) when the thread has already been up-voted by the user', () => {
    // arrange
    const threads = [
      { id: 'thread-1', upVotesBy: ['users-9'], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-9' },
    };

    // action
    const nextState = threadsReducer(threads, action);

    // assert
    expect(nextState[0].upVotesBy).toEqual([]);
  });

  it('should add userId to downVotesBy and remove it from upVotesBy when the thread has not been down-voted yet by the user', () => {
    // arrange
    const threads = [
      { id: 'thread-1', upVotesBy: ['users-9'], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-9' },
    };

    // action
    const nextState = threadsReducer(threads, action);

    // assert
    expect(nextState[0].downVotesBy).toEqual(['users-9']);
    expect(nextState[0].upVotesBy).toEqual([]);
  });

  it('should remove userId from downVotesBy (toggle off) when the thread has already been down-voted by the user', () => {
    // arrange
    const threads = [
      { id: 'thread-1', upVotesBy: [], downVotesBy: ['users-9'] },
    ];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-9' },
    };

    // action
    const nextState = threadsReducer(threads, action);

    // assert
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should remove userId from both upVotesBy and downVotesBy when given by NEUTRALIZE_VOTE_THREAD action', () => {
    // arrange
    const threads = [
      { id: 'thread-1', upVotesBy: ['users-9'], downVotesBy: [] },
    ];
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-9' },
    };

    // action
    const nextState = threadsReducer(threads, action);

    // assert
    expect(nextState[0].upVotesBy).toEqual([]);
    expect(nextState[0].downVotesBy).toEqual([]);
  });

  it('should only update the thread that matches the given threadId and leave the other threads untouched', () => {
    // arrange
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-9' },
    };

    // action
    const nextState = threadsReducer(sampleThreads, action);

    // assert
    expect(nextState[1]).toEqual(sampleThreads[1]);
  });
});
