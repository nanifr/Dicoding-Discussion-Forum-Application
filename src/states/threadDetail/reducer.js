import { ActionType } from './action';

function toggleVote(list = [], userId) {
  return list.includes(userId)
    ? list.filter((id) => id !== userId)
    : list.concat([userId]);
}

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.UP_VOTE_THREAD_DETAIL: {
    const upVotesBy = toggleVote(threadDetail.upVotesBy, action.payload.userId);
    const downVotesBy = threadDetail.downVotesBy.filter((id) => id !== action.payload.userId);
    return { ...threadDetail, upVotesBy, downVotesBy };
  }
  case ActionType.DOWN_VOTE_THREAD_DETAIL: {
    const downVotesBy = toggleVote(threadDetail.downVotesBy, action.payload.userId);
    const upVotesBy = threadDetail.upVotesBy.filter((id) => id !== action.payload.userId);
    return { ...threadDetail, upVotesBy, downVotesBy };
  }
  case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL: {
    const upVotesBy = threadDetail.upVotesBy.filter((id) => id !== action.payload.userId);
    const downVotesBy = threadDetail.downVotesBy.filter((id) => id !== action.payload.userId);
    return { ...threadDetail, upVotesBy, downVotesBy };
  }
  case ActionType.UP_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }
        return {
          ...comment,
          upVotesBy: toggleVote(comment.upVotesBy, action.payload.userId),
          downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }),
    };
  case ActionType.DOWN_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }
        return {
          ...comment,
          downVotesBy: toggleVote(comment.downVotesBy, action.payload.userId),
          upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
        };
      }),
    };
  case ActionType.NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id !== action.payload.commentId) {
          return comment;
        }
        return {
          ...comment,
          upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
          downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
        };
      }),
    };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
