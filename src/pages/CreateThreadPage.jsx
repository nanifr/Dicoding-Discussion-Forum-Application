import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  const onAddThread = async ({ title, category, body }) => {
    const thread = await dispatch(asyncAddThread({ title, category, body }));

    if (thread) {
      navigate('/');
    }
  };

  if (!authUser) {
    return null;
  }

  return (
    <section className="create-thread-page">
      <h1>Buat Thread Baru</h1>
      <ThreadInput addThread={onAddThread} />
    </section>
  );
}

export default CreateThreadPage;
