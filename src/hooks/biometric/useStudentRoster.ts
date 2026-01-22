'use client';
import { useState } from 'react';

export interface Staff {
  id: string;
  name: string;
  role: 'Principal' | 'Counselor' | 'Specialist';
  department: string;
}

export function useSchoolData() {
  const [students] = useState([
    { id: '1', name: 'Alex Johnson', literacyLevel: 85, status: 'optimal' },
    { id: '2', name: 'Sarah Miller', literacyLevel: 42, status: 'intervention' },
    { id: '3', name: 'Leo Zhang', literacyLevel: 68, status: 'focus' },
    { id: '4', name: 'Maya Patel', literacyLevel: 92, status: 'optimal' },
    { id: '5', name: 'Jordan Smith', literacyLevel: 31, status: 'intervention' },
  ]);

  const [staff] = useState<Staff[]>([
    { id: 's1', name: 'Dr. Aris Thorne', role: 'Principal', department: 'Leadership' },
    { id: 's2', name: 'Sarah Vance', role: 'Counselor', department: 'Support' },
    { id: 's3', name: 'Marcus Flint', role: 'Specialist', department: 'Pedagogy' },
  ]);

  return { students, staff };
}
