'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminSchoolsPage() {
  const [search, setSearch] = useState('');

  const schools = [
    { id: 1, name: "Lincoln Elementary", teachers: 42, students: 612, status: "Active", adoption: "92%" },
    { id: 2, name: "Washington Middle School", teachers: 58, students: 784, status: "Active", adoption: "87%" },
    { id: 3, name: "Jefferson High School", teachers: 71, students: 954, status: "Active", adoption: "78%" },
    { id: 4, name: "Roosevelt Elementary", teachers: 35, students: 498, status: "Pending", adoption: "41%" },
  ];

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Schools</h1>
            <p className="text-white/70 mt-1">Manage all schools in the district</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Add School
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-white/5 border-white/10"
          />
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <Card key={school.id} className="bg-white/[0.03] border-white/10 hover:border-[#C5A46E]/40 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{school.name}</CardTitle>
                      <p className="text-white/60 text-sm mt-1">{school.teachers} Teachers • {school.students} Students</p>
                    </div>
                    <Badge 
                      className={
                        school.status === "Active" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                          : "bg-[#C5A46E]/10 text-[#C5A46E] border-[#C5A46E]/30"
                      }
                    >
                      {school.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-white/60">Platform Adoption</p>
                      <p className="text-3xl font-semibold">{school.adoption}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-white/50 py-10">No schools found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
