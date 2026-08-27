import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import CategoryFilter from '../components/CategoryFilter';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncUpVoteThread, asyncDownVoteThread } from '../states/threads/action';
import { getAvatarUrl } from '../utils';

function HomePage() {
  const { threads = [], users = [], authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (threadId) => {
    if (!authUser) {
      alert('Kamu harus masuk terlebih dahulu untuk memberi vote');
      return;
    }
    dispatch(asyncUpVoteThread(threadId));
  };

  const onDownVote = (threadId) => {
    if (!authUser) {
      alert('Kamu harus masuk terlebih dahulu untuk memberi vote');
      return;
    }
    dispatch(asyncDownVoteThread(threadId));
  };

  const threadList = useMemo(() => threads.map((thread) => {
    const owner = users.find((user) => user.id === thread.ownerId);
    return {
      ...thread,
      ownerName: owner ? owner.name : 'Pengguna',
      ownerAvatar: getAvatarUrl(owner || { name: 'Pengguna' }),
    };
  }), [threads, users]);

  const categories = useMemo(() => (
    [...new Set(threadList.map((thread) => thread.category).filter(Boolean))]
  ), [threadList]);

  const filteredThreads = useMemo(() => (
    activeCategory
      ? threadList.filter((thread) => thread.category === activeCategory)
      : threadList
  ), [threadList, activeCategory]);

  return (
    <section className="home-page">
      <h1 className="home-page__title">Thread Terbaru</h1>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <ThreadsList
        threads={filteredThreads}
        authUserId={authUser?.id}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
    </section>
  );
}

export default HomePage;
