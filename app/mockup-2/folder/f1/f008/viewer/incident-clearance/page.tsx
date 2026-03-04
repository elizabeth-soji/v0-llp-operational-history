"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  Download,
  Printer,
  MoreVertical,
  Search,
  ZoomIn,
  ZoomOut,
  FileText,
  Layers,
  Scissors,
  Undo,
  Redo,
} from "lucide-react"

// Page data using incident clearance image
const pages = [
  {
    id: 1,
    thumbnail: "/documents/sia-incident-clearance.jpg",
  },
]

export default function IncidentClearanceViewerPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const totalPages = pages.length

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/mockup-2/folder/f1">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Review & Verify Finding
              </h1>
              <p className="text-sm text-slate-500">
                Incident/Accident Clearance Statement - Pegasus Airlines
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Page Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-600 min-w-[80px] text-center">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-600 min-w-[50px] text-center">
                {zoom}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Toolbar */}
      <div className="bg-slate-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <span className="text-sm text-white font-medium">
            PGT-ED/AAC-4690 - Incident Clearance Statement
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Page Input */}
          <div className="flex items-center gap-1 bg-slate-600 rounded px-2 py-1">
            <input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value)
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page)
                }
              }}
              className="w-8 bg-transparent text-white text-sm text-center focus:outline-none"
              min={1}
              max={totalPages}
            />
            <span className="text-slate-400 text-sm">/ {totalPages}</span>
          </div>

          {/* Zoom Controls */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
            onClick={handleZoomOut}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="bg-slate-600 px-2 py-1 rounded text-sm text-white min-w-[50px] text-center">
            {zoom}%
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
            onClick={handleZoomIn}
          >
            <Plus className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-slate-500 mx-2" />

          {/* Tool Icons */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
          >
            <Scissors className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-slate-500 mx-2" />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
          >
            <Redo className="h-4 w-4" />
          </Button>

          <div className="w-px h-6 bg-slate-500 mx-2" />

          {/* Actions */}
          <a href="/documents/sia-incident-clearance.jpg" download>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
            >
              <Download className="h-4 w-4" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
          >
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-300 hover:text-white hover:bg-slate-600"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Thumbnail Sidebar */}
        <div className="w-48 bg-slate-200 border-r border-slate-300 p-4 overflow-y-auto">
          <div className="space-y-4">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`w-full text-center transition-all ${
                  currentPage === page.id
                    ? "ring-2 ring-sky-500 ring-offset-2"
                    : "hover:ring-2 hover:ring-slate-400 hover:ring-offset-1"
                }`}
              >
                <div className="bg-white border border-slate-300 rounded shadow-sm aspect-[8.5/11] overflow-hidden mb-2">
                  <img
                    src={page.thumbnail}
                    alt={`Page ${page.id}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="text-xs text-slate-600">{page.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* PDF Content Area */}
        <div className="flex-1 bg-slate-500 overflow-auto p-8 flex justify-center">
          <div
            className="bg-white shadow-xl rounded overflow-hidden"
            style={{
              width: `${((8.5 * zoom) / 100) * 96}px`,
              minHeight: `${((11 * zoom) / 100) * 96}px`,
              transform: `scale(1)`,
              transformOrigin: "top center",
            }}
          >
            {/* Display Incident Clearance Document Image */}
            <img
              src="/documents/sia-incident-clearance.jpg"
              alt="Incident/Accident Clearance Statement - Pegasus Airlines"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
