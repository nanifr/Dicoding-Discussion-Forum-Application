import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>404</h1>
      <p>Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/">Kembali ke beranda</Link>
    </section>
  );
}

export default NotFoundPage;
