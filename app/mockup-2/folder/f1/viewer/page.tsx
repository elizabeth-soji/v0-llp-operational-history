"use client"

import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Printer,
  Menu,
  ZoomIn,
  ZoomOut,
  Search,
  MoreVertical,
  FileText,
  Undo2,
  Redo2,
  Layers,
  Scissors,
  X,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Page data using Magellan LLP History image
const pages = [
  {
    id: 1,
    thumbnail: "/documents/magellan-llp-history.jpg",
  },
]

export default function PDFViewerPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const totalPages = pages.length

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleZoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 25)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 25) {
      setZoom(zoom - 25)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Review & Verify Finding
            </h1>
            <p className="text-sm text-slate-500">
              Life Limited Part History - Magellan Aviation Group
            </p>
          </div>
          <Link href="/mockup-2/folder/f1">
            <Button variant="ghost" size="sm" className="gap-1">
              <X className="h-4 w-4" />
              Close
            </Button>
          </Link>
        </div>
      </div>

      {/* Page Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-700 w-12 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 25}
            className="h-8 w-8"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="h-8 w-8"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Toolbar */}
      <div className="bg-slate-700 px-4 py-2 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Magnellen LLP History - Operational Record
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Page Input */}
          <div className="flex items-center bg-slate-600 rounded px-2 py-1 gap-1">
            <input
              type="number"
              value={currentPage}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                if (val >= 1 && val <= totalPages) {
                  setCurrentPage(val)
                }
              }}
              className="w-8 bg-transparent text-white text-center text-sm outline-none"
              min={1}
              max={totalPages}
            />
            <span className="text-slate-400 text-sm">/ {totalPages}</span>
          </div>

          <div className="w-px h-5 bg-slate-500 mx-2" />

          {/* Zoom Controls */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
            onClick={handleZoomOut}
          >
            <span className="text-lg">-</span>
          </Button>
          <div className="bg-slate-600 rounded px-2 py-1 text-sm min-w-[50px] text-center">
            {zoom}%
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
            onClick={handleZoomIn}
          >
            <span className="text-lg">+</span>
          </Button>

          <div className="w-px h-5 bg-slate-500 mx-2" />

          {/* Tool Icons */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
          >
            <FileText className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
          >
            <Scissors className="h-4 w-4" />
          </Button>

          <div className="w-px h-5 bg-slate-500 mx-2" />

          {/* Undo/Redo */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
          >
            <Redo2 className="h-4 w-4" />
          </Button>

          <div className="w-px h-5 bg-slate-500 mx-2" />

          {/* Actions */}
          <a href="/documents/magellan-llp-history.jpg" download>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-slate-600"
            >
              <Download className="h-4 w-4" />
            </Button>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
          >
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-slate-600"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Page Thumbnails */}
        {sidebarOpen && (
          <div className="w-48 bg-slate-200 border-r border-slate-300 overflow-y-auto p-4 space-y-4">
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
        )}

        {/* PDF Content Area */}
        <div className="flex-1 bg-slate-500 overflow-auto p-8 flex justify-center">
          <div
            className="bg-white shadow-xl rounded overflow-hidden"
            style={{
              width: `${(8.5 * zoom) / 100 * 96}px`,
              minHeight: `${(11 * zoom) / 100 * 96}px`,
              transform: `scale(1)`,
              transformOrigin: "top center",
            }}
          >
            {/* Display Magellan LLP History Document Image */}
            <img
              src="/documents/magellan-llp-history.jpg"
              alt="Magellan Aviation Group - Life Limited Part History"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
