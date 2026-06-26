'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');

  const users = [
    { id: 1, name: "Sarah Mitchell", email: "sarah.mitchell@school.org", role: "Teacher", school: "Lincoln Elementary", status: "Active" },
    { id: 2, name: "James Rivera", email: "james.rivera@school.org", role: "Teacher", school: "Washington Middle", status: "Active" },
    { id: 3, name: "Maria Lopez", email: "maria.lopez@school.org", role: "Admin", school: "District Office", status: "Active" },
    { id: 4, name: "David Chen", email: "david.chen@school.org", role: "Teacher", school: "Jefferson High", status: "Inactive" },
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
            <h1 className="text-4xl font-semibold tracking-[-2px]">Users</h1>
            <p className="text-white/70 mt-1">Manage teachers, staff, and administrators</p>
          </div>
          <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold">
            + Invite User
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4 font-medium">{user.name}</td>
                      <td className="p-4 text-white/80">{user.email}</td>
                      <td className="p-4">
                        <Badge variant="outline">{user.role}</Badge>
                      </td>
                      <td className="p-4 text-white/80">{user.school}</td>
                      <td className="p-4">
                        <Badge 
                          className={
                            user.status === "Active" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                              : "bg-white/10 text-white/60 border-white/20"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-white/50">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <p className="text-xs text-white/40 mt-6 text-center">
          User management is restricted to district administrators.
        </p>
      </div>
    </div>
  );
}
