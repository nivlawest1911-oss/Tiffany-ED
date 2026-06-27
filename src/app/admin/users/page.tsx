'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ManageUsersPage() {
  const [search, setSearch] = useState('');

  const users = [
    { id: '1', name: 'Sarah Mitchell', email: 'sarah.mitchell@school.edu', role: 'Teacher', school: 'Lincoln Elementary', status: 'Active' },
    { id: '2', name: 'James Rivera', email: 'james.rivera@school.edu', role: 'Teacher', school: 'Lincoln Elementary', status: 'Active' },
    { id: '3', name: 'Maria Lopez', email: 'maria.lopez@school.edu', role: 'School Admin', school: 'Washington Middle', status: 'Active' },
    { id: '4', name: 'David Chen', email: 'david.chen@school.edu', role: 'Teacher', school: 'Jefferson High', status: 'Inactive' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-[-2px]">Manage Users</h1>
            <p className="text-white/70 mt-1">View and manage all users across the district</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Add New User
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md bg-white/5 border-white/10"
          />
        </div>

        {/* Users Table */}
        <Card className="bg-white/[0.03] border-white/10">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="text-left p-4 font-medium text-white/70">Name</th>
                    <th className="text-left p-4 font-medium text-white/70">Email</th>
                    <th className="text-left p-4 font-medium text-white/70">Role</th>
                    <th className="text-left p-4 font-medium text-white/70">School</th>
                    <th className="text-left p-4 font-medium text-white/70">Status</th>
                    <th className="text-right p-4 font-medium text-white/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-white/50">No users found.</td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4 font-medium">{user.name}</td>
                        <td className="p-4 text-white/70">{user.email}</td>
                        <td className="p-4 text-white/70">{user.role}</td>
                        <td className="p-4 text-white/70">{user.school}</td>
                        <td className="p-4">
                          <Badge 
                            className={
                              user.status === 'Active' 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                : 'bg-white/10 text-white/60 border-white/20'
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="ghost" className="text-red-400">Deactivate</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
