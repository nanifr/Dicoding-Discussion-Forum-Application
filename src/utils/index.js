function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);

  if (diffDays > 0) {
    return `${diffDays} hari yang lalu`;
  } if (diffHours > 0) {
    return `${diffHours} jam yang lalu`;
  } if (diffMinutes > 0) {
    return `${diffMinutes} menit yang lalu`;
  } if (diffSeconds > 0) {
    return `${diffSeconds} detik yang lalu`;
  }
  return 'baru saja';
}

function truncateText(text = '', maxLength = 160) {
  const plainText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trim()}...`;
}

function getAvatarUrl(user = {}) {
  // Beberapa response API (mis. owner pada komentar baru) tidak menyertakan
  // avatar, jadi kita buat fallback avatar berbasis nama.
  if (user.avatar) {
    return user.avatar;
  }
  const name = encodeURIComponent(user.name || 'User');
  return `https://ui-avatars.com/api/?name=${name}&background=random`;
}

export { postedAt, truncateText, getAvatarUrl };
