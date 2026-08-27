import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    addComment(content);
    setContent('');
  }

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={({ target }) => setContent(target.value)}
        placeholder="Tulis komentarmu..."
        rows={4}
        required
      />
      <button type="submit">Kirim Komentar</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
