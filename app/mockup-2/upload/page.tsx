"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Upload, X, File, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function UploadDocumentsPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(files)])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/mockup-2">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Upload Documents</h1>
          <p className="text-slate-600 mt-2">Upload files to the IATA Binder</p>
        </div>

        {/* Upload Area */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-white"
              }`}
            >
              <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragging ? "text-blue-500" : "text-slate-400"}`} />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Drop files here or click to browse</h3>
              <p className="text-sm text-slate-600 mb-4">Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG</p>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button asChild>
                  <span>Select Files</span>
                </Button>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Selected Files ({selectedFiles.length})</h3>
                <Button onClick={() => setSelectedFiles([])} variant="ghost" size="sm">
                  Clear All
                </Button>
              </div>

              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <File className="h-5 w-5 text-slate-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button onClick={() => removeFile(index)} variant="ghost" size="sm" className="flex-shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex gap-3">
                  <Button className="flex-1 bg-slate-900 hover:bg-slate-800" disabled={selectedFiles.length === 0}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Upload {selectedFiles.length} {selectedFiles.length === 1 ? "File" : "Files"}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedFiles([])}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
