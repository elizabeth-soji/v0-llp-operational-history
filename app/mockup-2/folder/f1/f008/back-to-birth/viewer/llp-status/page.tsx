"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Search,
  Menu,
  Download,
  Printer,
  MoreVertical,
  Undo,
  Redo,
  FileText,
  Layers,
  Scissors,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Page data using LLP Status image
const pages = [
  {
    id: 1,
    thumbnail: "/documents/sia-llp-status.jpg",
  },
]

export default function LLPStatusViewerPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [pageInput, setPageInput] = useState("1")
  const totalPages = pages.length

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setPageInput(page.toString())
    }
  }

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value)
  }

  const handlePageInputBlur = () => {
    const page = parseInt(pageInput, 10)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    } else {
      setPageInput(currentPage.toString())
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Review & Verify Finding
            </h1>
            <p className="text-sm text-slate-500">
              LLP Status Report - Engine Life Limited Part Status
            </p>
          </div>
          <Link href="/mockup-2/folder/f1">
            <Button variant="ghost" size="sm" className="gap-1">
              <X className="h-4 w-4" />
              Close
            </Button>
          </Link>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <span className="text-sm text-slate-600">{zoom}%</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-700 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium">
            Engine Life Limited Part Status - Pegasus Airlines
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-600 rounded px-2">
            <Input
              type="text"
              value={pageInput}
              onChange={handlePageInputChange}
              onBlur={handlePageInputBlur}
              className="w-10 h-7 text-center bg-transparent border-0 text-white text-sm p-0 focus-visible:ring-0"
            />
            <span className="text-slate-400 text-sm">/ {totalPages}</span>
          </div>

          <div className="flex items-center gap-1 ml-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600" onClick={handleZoomOut}>
              <span className="text-lg">−</span>
            </Button>
            <div className="bg-slate-600 rounded px-2 py-1 text-sm min-w-[60px] text-center">
              {zoom}%
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600" onClick={handleZoomIn}>
              <span className="text-lg">+</span>
            </Button>
          </div>

          <div className="flex items-center gap-1 ml-4 border-l border-slate-500 pl-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
              <Layers className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
              <Scissors className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 ml-4 border-l border-slate-500 pl-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <a href="/documents/sia-llp-status.jpg" download>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
              <Download className="h-4 w-4" />
            </Button>
          </a>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Page Thumbnails */}
        <div className="w-48 bg-slate-200 border-r border-slate-300 p-3 overflow-y-auto">
          <div className="space-y-3">
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
              width: `${(11 * zoom) / 100 * 96}px`,
              minHeight: `${(8.5 * zoom) / 100 * 96}px`,
              transform: `scale(1)`,
              transformOrigin: "top center",
            }}
          >
            {/* Display LLP Status Document Image */}
            <img
              src="/documents/sia-llp-status.jpg"
              alt="Pegasus Airlines - Engine Life Limited Part Status"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
