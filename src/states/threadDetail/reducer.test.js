import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

/**
 * skenario testing:
 * - threadDetailReducer function
 *   - should return null as the initial state when given by unknown action
 *   - should return the previous state when given by unknown action
 *   - should return the threadDetail from the action payload when given by
 *     RECEIVE_THREAD_DETAIL action
 *   - should return null when given by CLEAR_THREAD_DETAIL action
 *   - should place the new comment at the beginning of the comments list when
 *     given by ADD_COMMENT action
 *   - should add userId to the thread's upVotesBy and remove it from downVotesBy
 *     when given by UP_VOTE_THREAD_DETAIL action
 *   - should remove userId from the thread's upVotesBy (toggle off) when the
 *     thread has already been up-voted, given by UP_VOTE_THREAD_DETAIL action
 *   - should add userId to the thread's downVotesBy and remove it from
 *     upVotesBy when given by DOWN_VOTE_THREAD_DETAIL action
 *   - should remove userId from both of the thread's vote lists when given by
 *     NEUTRALIZE_VOTE_THREAD_DETAIL action
 *   - should only toggle the up vote of the matching comment and leave other
 *     comments untouched, given by UP_VOTE_COMMENT action
 *   - should only toggle the down vote of the matching comment, given by
 *     DOWN_VOTE_COMMENT action
 *   - should remove both votes of the matching comment when given by
 *     NEUTRALIZE_VOTE_COMMENT action
 */

function makeThreadDetail(overrides = {}) {
  return {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2024-01-01T00:00:00.000Z',
    owner: { id: 'users-1', name: 'John Doe', avatar: 'https://avatar.jpg' },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Komentar pertama',
        createdAt: '2024-01-01T01:00:00.000Z',
        owner: { id: 'users-2', name: 'Jane Doe', avatar: 'https://avatar2.jpg' },
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: 'comment-2',
        content: 'Komentar kedua',
        createdAt: '2024-01-01T02:00:00.000Z',
        owner: { id: 'users-3', name: 'Bob', avatar: 'https://avatar3.jpg' },
        upVotesBy: ['users-9'],
        downVotesBy: [],
      },
    ],
    ...overrides,
  };
}

describe('threadDetailReducer function', () => {
  it('should return null as the initial state when given by unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(undefined, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return the previous state when given by unknown action', () => {
    // arrange
    const threadDetail = makeThreadDetail();
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState).toBe(threadDetail);
  });

  it('should return the threadDetail from the action payload when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const threadDetail = makeThreadDetail();
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail },
    };

    // action
    const nextState = threadDetailReducer(null, action);

    // assert
    expect(nextState).toEqual(threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const threadDetail = makeThreadDetail();
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should place the new comment at the beginning of the comments list when given by ADD_COMMENT action', () => {
    // arrange
    const threadDetail = makeThreadDetail();
    const newComment = {
      id: 'comment-3',
      content: 'Komentar baru',
      createdAt: '2024-01-01T03:00:00.000Z',
      owner: { id: 'users-1', name: 'John Doe', avatar: 'https://avatar.jpg' },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.comments).toHaveLength(3);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it("should add userId to the thread's upVotesBy and remove it from downVotesBy when given by UP_VOTE_THREAD_DETAIL action", () => {
    // arrange
    const threadDetail = makeThreadDetail({ upVotesBy: [], downVotesBy: ['users-9'] });
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-9' },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.upVotesBy).toEqual(['users-9']);
    expect(nextState.downVotesBy).toEqual([]);
  });

  it("should remove userId from the thread's upVotesBy (toggle off) when the thread has already been up-voted, given by UP_VOTE_THREAD_DETAIL action", () => {
    // arrange
    const threadDetail = makeThreadDetail({ upVotesBy: ['users-9'], downVotesBy: [] });
    const action = {
      type: ActionType.UP_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-9' },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.upVotesBy).toEqual([]);
  });

  it("should add userId to the thread's downVotesBy and remove it from upVotesBy when given by DOWN_VOTE_THREAD_DETAIL action", () => {
    // arrange
    const threadDetail = makeThreadDetail({ upVotesBy: ['users-9'], downVotesBy: [] });
    const action = {
      type: ActionType.DOWN_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-9' },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.downVotesBy).toEqual(['users-9']);
    expect(nextState.upVotesBy).toEqual([]);
  });

  it("should remove userId from both of the thread's vote lists when given by NEUTRALIZE_VOTE_THREAD_DETAIL action", () => {
    // arrange
    const threadDetail = makeThreadDetail({ upVotesBy: ['users-9'], downVotesBy: [] });
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
      payload: { userId: 'users-9' },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.upVotesBy).toEqual([]);
    expect(nextState.downVotesBy).toEqual([]);
  });

  it('should only toggle the up vote of the matching comment and leave other comments untouched, given by UP_VOTE_COMMENT action', () => {
    // arrange
    const threadDetail = makeThreadDetail();
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'users-9' },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual(['users-9']);
    expect(nextState.comments[1]).toEqual(threadDetail.comments[1]);
  });

  it('should only toggle the down vote of the matching comment, given by DOWN_VOTE_COMMENT action', () => {
    // arrange
    const threadDetail = makeThreadDetail();
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: { commentId: 'comment-2', userId: 'users-9' },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.comments[1].downVotesBy).toEqual(['users-9']);
    expect(nextState.comments[1].upVotesBy).toEqual([]);
    expect(nextState.comments[0]).toEqual(threadDetail.comments[0]);
  });

  it('should remove both votes of the matching comment when given by NEUTRALIZE_VOTE_COMMENT action', () => {
    // arrange
    const threadDetail = makeThreadDetail();
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT,
      payload: { commentId: 'comment-2', userId: 'users-9' },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.comments[1].upVotesBy).toEqual([]);
    expect(nextState.comments[1].downVotesBy).toEqual([]);
  });
});
