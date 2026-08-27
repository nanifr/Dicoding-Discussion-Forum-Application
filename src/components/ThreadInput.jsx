import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      return;
    }

    addThread({ title, category, body });
  }

  return (
    <form className="thread-input" onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={onTitleChange} placeholder="Judul thread" required />
      <input type="text" value={category} onChange={onCategoryChange} placeholder="Kategori (opsional)" />
      <textarea value={body} onChange={onBodyChange} placeholder="Apa yang ingin kamu diskusikan?" rows={8} required />
      <button type="submit">Publikasikan Thread</button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
