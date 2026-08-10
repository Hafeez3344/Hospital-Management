'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.25rem', color: '#555' }}>Page not found</p>
      <Link href="/" style={{ color: '#0070f3', marginTop: '1rem' }}>
        Go back home
      </Link>
    </div>
  );
}
