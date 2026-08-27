import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const isAlreadyUpVoted = threadDetail.upVotesBy.includes(authUser.id);

    // Optimistically apply action
    dispatch(upVoteThreadDetailActionCreator(authUser.id));

    try {
      if (isAlreadyUpVoted) {
        await api.neutralizeThreadVote(threadDetail.id);
      } else {
        await api.upVoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const isAlreadyDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    // Optimistically apply action
    dispatch(downVoteThreadDetailActionCreator(authUser.id));

    try {
      if (isAlreadyDownVoted) {
        await api.neutralizeThreadVote(threadDetail.id);
      } else {
        await api.downVoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
    }
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const comment = threadDetail.comments.find((item) => item.id === commentId);
    const isAlreadyUpVoted = comment.upVotesBy.includes(authUser.id);

    // Optimistically apply action
    dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      if (isAlreadyUpVoted) {
        await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
      } else {
        await api.upVoteComment({ threadId: threadDetail.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const comment = threadDetail.comments.find((item) => item.id === commentId);
    const isAlreadyDownVoted = comment.downVotesBy.includes(authUser.id);

    // Optimistically apply action
    dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      if (isAlreadyDownVoted) {
        await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
      } else {
        await api.downVoteComment({ threadId: threadDetail.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
};
