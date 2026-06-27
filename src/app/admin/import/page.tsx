'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DataImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);

    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      alert(`File "${file.name}" uploaded successfully!`);
      setFile(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-2px]">Data Import</h1>
          <p className="text-white/70 mt-1">Upload student rosters, assessment data, or other files</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-dashed border-white/20 rounded-2xl p-8 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".csv,.xlsx,.xls"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-[#C5A46E] text-4xl mb-3">↑</div>
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-white/60 mt-1">Supports CSV and Excel files</p>
                </label>
              </div>

              {file && (
                <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-white/60">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <Button 
                    onClick={handleUpload} 
                    disabled={uploading}
                    className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C]"
                  >
                    {uploading ? 'Uploading...' : 'Upload File'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Supported Formats */}
          <Card className="bg-white/[0.03] border-white/10">
            <CardHeader>
              <CardTitle>Supported File Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span>Student Rosters</span>
                <Badge variant="outline">.csv, .xlsx</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Assessment Data</span>
                <Badge variant="outline">.csv, .xlsx</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Intervention Records</span>
                <Badge variant="outline">.csv</Badge>
              </div>
              <div className="pt-4 text-xs text-white/60">
                Files are automatically validated and mapped to your district’s data model.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Imports */}
        <Card className="mt-8 bg-white/[0.03] border-white/10">
          <CardHeader>
            <CardTitle>Recent Imports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-white/70">
              No recent imports found.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
