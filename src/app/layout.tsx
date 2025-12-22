// src/app/layout.tsx
import React from 'react';
import '../index.css';

export const metadata = {
  title: 'Cognitive Fitness',
  description: 'A Holistic Approach to Student Success',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
            <header className="app-header">
                <h1>Cognitive Fitness in the Age of AI</h1>
                <p className="subtitle">A Holistic Approach to Student Success</p>
            </header>
            <main className="content">
                {children}
            </main>
        </div>
      </body>
    </html>
  );
}
