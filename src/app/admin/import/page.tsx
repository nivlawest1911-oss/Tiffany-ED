'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DataImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importType, setImportType] = useState('students');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!selectedFile) return;
    alert(`Importing ${importType} from: ${selectedFile.name}`);
    // TODO: Connect to actual import API
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Data Import</h1>
          <p className="text-white/70 mt-1">Import student data, assessments, and rosters</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Import Options */}
          <Card className="lg:col-span-1 bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Import Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { value: 'students', label: 'Student Roster' },
                { value: 'assessments', label: 'Assessment Data' },
                { value: 'groups', label: 'Student Groups' },
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => setImportType(option.value)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    importType === option.value 
                      ? 'border-[#C5A46E] bg-[#C5A46E]/5' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <p className="font-medium">{option.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card className="lg:col-span-2 bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-dashed border-white/20 rounded-3xl p-10 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".csv,.xlsx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                    <span className="text-3xl">📁</span>
                  </div>
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-white/60 mt-1">CSV or Excel files up to 50MB</p>
                </label>
              </div>

              {selectedFile && (
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 p-4">
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-white/60">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button onClick={handleImport} className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C]">
                    Start Import
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Imports */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent Imports</h2>
          <Card className="bg-white/[0.03] border-white/10">
            <CardContent className="p-0">
              <div className="divide-y divide-white/10">
                {[
                  { file: "Spring_2026_Assessments.xlsx", date: "Jun 20, 2026", status: "Completed", records: "12,847" },
                  { file: "New_Student_Roster.csv", date: "Jun 18, 2026", status: "Completed", records: "342" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-6">
                    <div>
                      <p className="font-medium">{item.file}</p>
                      <p className="text-sm text-white/60">{item.date} • {item.records} records</p>
                    </div>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
