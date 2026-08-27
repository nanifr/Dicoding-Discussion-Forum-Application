import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import CommentsList from '../components/CommentsList';
import CommentInput from '../components/CommentInput';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncUpVoteComment,
  asyncDownVoteComment,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThread = () => {
    if (!authUser) {
      alert('Kamu harus masuk terlebih dahulu untuk memberi vote');
      return;
    }
    dispatch(asyncUpVoteThreadDetail());
  };

  const onDownVoteThread = () => {
    if (!authUser) {
      alert('Kamu harus masuk terlebih dahulu untuk memberi vote');
      return;
    }
    dispatch(asyncDownVoteThreadDetail());
  };

  const onUpVoteComment = (commentId) => {
    if (!authUser) {
      alert('Kamu harus masuk terlebih dahulu untuk memberi vote');
      return;
    }
    dispatch(asyncUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    if (!authUser) {
      alert('Kamu harus masuk terlebih dahulu untuk memberi vote');
      return;
    }
    dispatch(asyncDownVoteComment(commentId));
  };

  const onAddComment = (content) => {
    if (!authUser) {
      alert('Kamu harus masuk terlebih dahulu untuk berkomentar');
      return;
    }
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <ThreadDetail
        {...threadDetail}
        authUserId={authUser?.id}
        onUpVote={onUpVoteThread}
        onDownVote={onDownVoteThread}
      />
      <div className="detail-page__comments">
        <h2>
          Komentar (
          {threadDetail.comments.length}
          )
        </h2>
        {authUser ? (
          <CommentInput addComment={onAddComment} />
        ) : (
          <p className="detail-page__login-hint">Masuk terlebih dahulu untuk menambahkan komentar.</p>
        )}
        <CommentsList
          comments={threadDetail.comments}
          authUserId={authUser?.id}
          onUpVote={onUpVoteComment}
          onDownVote={onDownVoteComment}
        />
      </div>
    </section>
  );
}

export default DetailPage;
