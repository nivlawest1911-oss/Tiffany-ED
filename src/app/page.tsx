// src/app/page.tsx
import React from 'react';
import HomePageClient from '../components/HomePageClient';

export default function Page() {
  return (
    <>
      <section className="intro">
        <h2>Welcome</h2>
        <p>
          Explore the intersection of cognitive health and artificial intelligence. 
          This application provides resources and insights into maintaining cognitive fitness 
          to thrive in an AI-driven educational landscape.
        </p>
      </section>

      <HomePageClient />

      <section className="resource-section">
        <h3>Featured Resource</h3>
        <div className="pdf-container">
          <p>Read the full paper:</p>
          <a 
            href="/cognitive-fitness.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="button"
          >
            Open PDF Document
          </a>
          
          <div className="pdf-preview">
            <iframe 
              src="/cognitive-fitness.pdf" 
              title="Cognitive Fitness PDF"
              width="100%" 
              height="600px" 
              style={{border: 'none', marginTop: '20px'}}
            />
          </div>
        </div>
      </section>
    </>
  );
}
