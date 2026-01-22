'use client';
import { useState } from 'react';

export function useSchoolData() {
  const [students] = useState([
    { id: '1', name: 'Alex Johnson', literacyLevel: 85, status: 'optimal' },
    { id: '2', name: 'Sarah Miller', literacyLevel: 42, status: 'intervention' },
    { id: '3', name: 'Leo Zhang', literacyLevel: 68, status: 'focus' },
    { id: '4', name: 'Maya Patel', literacyLevel: 92, status: 'optimal' },
    { id: '5', name: 'Jordan Smith', literacyLevel: 31, status: 'intervention' },
  ]);

  const [staff] = useState([
    { id: 's1', name: 'Dr. Aris Thorne', role: 'Principal' },
    { id: 's2', name: 'Sarah Vance', role: 'Counselor' },
    { id: 's3', name: 'Marcus Flint', role: 'Specialist' },
  ]);

  const [resources] = useState([
    { id: 'r1', title: 'Phonics Level A', type: 'Digital', target: 'intervention' },
    { id: 'r2', title: 'Fraction Tiles', type: 'Physical', target: 'focus' },
    { id: 'r3', title: 'Creative Writing', type: 'Digital', target: 'optimal' },
    { id: 'r4', title: 'Reading Mastery', type: 'Digital', target: 'intervention' },
  ]);

  return { 
    students, 
    staff, 
    resources, 
    totalHoursSaved: 34 // Hardcoded ROI for now
  };
}
