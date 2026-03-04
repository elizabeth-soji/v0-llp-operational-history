"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ChevronDown,
  ChevronUp,
  FileText,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ExternalLink,
  Info,
  X,
  ZoomIn,
  ZoomOut,
  Menu,
  Printer,
  MoreVertical,
  Undo2,
  Redo2,
  Layers,
  Scissors,
  Search,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

// Cross-check variables that must match across all documents
const crossCheckVariables = [
  {
label: "LLP Part Number",
  value: "340-301-301-0",
    status: "match" as const,
    sources: ["ON/OFF Log", "ARC", "LLP Status", "Birth Record"],
  },
  {
    label: "LLP Serial Number",
    value: "HPT-7382-001",
    status: "match" as const,
    sources: ["ON/OFF Log", "ARC", "LLP Status", "Incident Clearance", "Birth Record"],
  },
  {
    label: "Engine Serial Number",
    value: "ESN-V2527-A5-19842",
    status: "match" as const,
    sources: ["ON/OFF Log", "ARC", "LLP Status", "Birth Record"],
  },
  {
    label: "Engine Model",
    value: "V2527-A5",
    status: "match" as const,
    sources: ["ON/OFF Log", "ARC", "LLP Status", "Birth Record"],
  },
  {
    label: "Removal Date",
    value: "15 Oct 2024",
    status: "warning" as const,
    sources: ["ON/OFF Log (15 Oct 2024)", "LLP Status (14 Oct 2024)"],
  },
  {
    label: "Installation Date",
    value: "22 Mar 2019",
    status: "match" as const,
    sources: ["ON/OFF Log", "Birth Record"],
  },
  {
    label: "LLP TSN at Removal",
    value: "18,742 FH",
    status: "match" as const,
    sources: ["ON/OFF Log", "LLP Status"],
  },
  {
    label: "LLP CSN at Removal",
    value: "12,456 FC",
    status: "match" as const,
    sources: ["ON/OFF Log", "LLP Status"],
  },
]

// Document sections data
const documentSections = [
  {
    id: "operational-history",
    title: "5. Operational History – ON / OFF Log",
    status: "verified" as const,
    lastUpdated: "2 Feb 2022",
    description: "Complete installation and removal history for the LLP",
    imagePreview: "/documents/magellan-llp-history.jpg",
    viewerLink: "/mockup-2/folder/f1/f001/viewer",
    keyData: [
      { label: "LLP Part Number", value: "340-301-301-0", highlight: true },
      { label: "LLP Serial Number", value: "PA877995", highlight: true },
      { label: "Engine Serial Number", value: "963481", highlight: true },
      { label: "Engine Model", value: "CFM56-7B26E", highlight: true },
    ],
    removalData: {
      title: "First Removal Date",
      date: "15 Oct 2024",
      fields: [
        { label: "At first removal LLP TSN", value: "30562" },
        { label: "At first removal LLP CSN", value: "16501" },
        { label: "At first removal Engine TSN", value: "30662" },
        { label: "At first removal Engine CSN", value: "16501" },
      ],
    },
    installationData: {
      title: "LLP Installation Date",
      date: "22 Mar 2019",
      fields: [
        { label: "At installation LLP TSN", value: "0" },
        { label: "At installation LLP CSN", value: "0" },
        { label: "At installation Engine TSN", value: "0" },
        { label: "At installation Engine CSN", value: "0" },
      ],
    },
  },
  {
    id: "authorized-release",
    title: "4. Authorized Release Certificate (EASA Form 1 / FAA 8130-3)",
    status: "verified" as const,
    lastUpdated: "13 Nov 2020",
    description: "Airworthiness release certificate for the LLP",
    imagePreview: "/documents/sia-auth-release-certificate.jpg",
    viewerLink: "/mockup-2/folder/f1/f001/viewer/arc",
    keyData: [
      { label: "Part Number", value: "340-301-301-0", highlight: true },
      { label: "Serial Number", value: "PA877995", highlight: true },
      { label: "Status", value: "INSPECTED", highlight: true, status: "success" },
      { label: "Date", value: "13th November 2020", highlight: true },
      { label: "Signature", value: "Jose Guadalupe Araujo Balderas" },
      { label: "Engine Serial Number", value: "962858", highlight: true },
      { label: "LLP TSN", value: "30562", highlight: true },
      { label: "LLP CSN", value: "16501", highlight: true },
    ],
  },
  {
    id: "llp-status",
    title: "3. LLP Status Report (at Removal)",
    status: "verified" as const,
    lastUpdated: "21 Jun 2020",
    description: "Life Limited Part status and remaining life calculation",
    imagePreview: "/documents/sia-llp-status.jpg",
    viewerLink: "/mockup-2/folder/f1/f001/viewer/llp-status",
    keyData: [
      { label: "Nomenclature", value: "LPT STAGE 4 DISK" },
      { label: "Date", value: "21st June 2020", highlight: true },
      { label: "Part Number", value: "340-301-301-0", highlight: true, status: "discrepancy" },
      { label: "Serial Number", value: "PA877995", highlight: true, status: "discrepancy" },
      { label: "Engine TSN", value: "30562", highlight: true },
      { label: "Engine CSN", value: "16501", highlight: true },
      { label: "LLP TSN", value: "30562", highlight: true },
      { label: "LLP CSN", value: "16501", highlight: true },
      { label: "Engine Serial Number", value: "963481", highlight: true },
    ],
  },
  {
    id: "incident-clearance",
    title: "2. Incident / Accident Clearance Statement",
    status: "verified" as const,
    lastUpdated: "24 May 2020",
    description: "Certification that the part has no incident or accident history",
    imagePreview: "/documents/sia-incident-clearance.jpg",
    viewerLink: "/mockup-2/folder/f1/f001/viewer/incident-clearance",
    keyData: [
      { label: "Date", value: "24th May 2020" },
      { label: "Period", value: "Manufacture to 24th May 2020" },
      { label: "Engine Serial Number", value: "963481" },
      { label: "Engine Model", value: "CFM56-7B26E" },
      { label: "Engine TSN", value: "30562", highlight: true },
      { label: "Engine CSN", value: "16501", highlight: true },
    ],
  },
  {
    id: "birth-record",
    title: "1. Engine Data Submittal (Birth Record)",
    status: "verified" as const,
    lastUpdated: "15 Oct 2024",
    description: "Original manufacturing and certification documentation",
    keyData: [
      { label: "LLP Part Number", value: "340-301-301-0", highlight: true },
      { label: "Serial Number", value: "HPT-7382-001", highlight: true },
      { label: "Engine S/N", value: "ESN-V2527-A5-19842", highlight: true },
      { label: "Engine Model", value: "V2527-A5", highlight: true },
      { label: "Manufacturer", value: "IAE International Aero Engines" },
      { label: "Manufacturing Date", value: "14 Feb 2019" },
      { label: "Manufacturing Location", value: "Newington, CT, USA" },
      { label: "Material Specification", value: "PWA 1484 (Nickel Alloy)" },
      { label: "Heat Treatment", value: "Solution + Age Hardened" },
      { label: "Quality Cert", value: "CoC-2019-V2527-78342" },
      { label: "First Installation", value: "22 Mar 2019", highlight: true },
      { label: "Original Aircraft", value: "MSN 7382 / JA112A" },
    ],
  },
]

// PDF Viewer Modal Component
function PDFViewerModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const totalPages = 2

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 25)
  }

  const handleZoomOut = () => {
    if (zoom > 25) setZoom(zoom - 25)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Top Header */}
          <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Review & Verify Finding
              </h2>
              <p className="text-sm text-slate-500">
                LLP History - Magnellen LLP History Document
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="gap-1">
              <X className="h-4 w-4" />
              Close
            </Button>
          </div>

          {/* Page Navigation Bar */}
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
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
              <div className="flex items-center bg-slate-600 rounded px-2 py-1 gap-1">
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => {
                    const val = parseInt(e.target.value)
                    if (val >= 1 && val <= totalPages) setCurrentPage(val)
                  }}
                  className="w-8 bg-transparent text-white text-center text-sm outline-none"
                  min={1}
                  max={totalPages}
                />
                <span className="text-slate-400 text-sm">/ {totalPages}</span>
              </div>

              <div className="w-px h-5 bg-slate-500 mx-2" />

              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600" onClick={handleZoomOut}>
                <span className="text-lg">-</span>
              </Button>
              <div className="bg-slate-600 rounded px-2 py-1 text-sm min-w-[50px] text-center">{zoom}%</div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600" onClick={handleZoomIn}>
                <span className="text-lg">+</span>
              </Button>

              <div className="w-px h-5 bg-slate-500 mx-2" />

              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
                <FileText className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
                <Layers className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
                <Scissors className="h-4 w-4" />
              </Button>

              <div className="w-px h-5 bg-slate-500 mx-2" />

              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-slate-600">
                <Redo2 className="h-4 w-4" />
              </Button>

              <div className="w-px h-5 bg-slate-500 mx-2" />

              <a href="/documents/magnellen-llp-history.pdf" download>
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

          {/* Main Content Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar - Page Thumbnails */}
            {sidebarOpen && (
              <div className="w-40 bg-slate-200 border-r border-slate-300 overflow-y-auto p-3 space-y-3">
                {[1, 2].map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-full text-center transition-all ${
                      currentPage === pageNum
                        ? "ring-2 ring-sky-500 ring-offset-2"
                        : "hover:ring-2 hover:ring-slate-400 hover:ring-offset-1"
                    }`}
                  >
                    <div className="bg-white border border-slate-300 rounded shadow-sm aspect-[8.5/11] flex items-center justify-center mb-1">
                      <div className="w-full h-full p-1.5 flex flex-col">
                        <div className="flex-1 bg-slate-50 rounded overflow-hidden p-1.5">
                          <div className="space-y-0.5">
                            <div className="h-1 bg-slate-300 rounded w-3/4 mx-auto" />
                            <div className="h-0.5 bg-slate-200 rounded w-full" />
                            <div className="h-0.5 bg-slate-200 rounded w-5/6" />
                            <div className="mt-1 border border-slate-200 rounded p-0.5">
                              <div className="grid grid-cols-3 gap-0.5">
                                <div className="h-0.5 bg-slate-300 rounded" />
                                <div className="h-0.5 bg-slate-300 rounded" />
                                <div className="h-0.5 bg-slate-300 rounded" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-600">{pageNum}</span>
                  </button>
                ))}
              </div>
            )}

            {/* PDF Content Area */}
            <div className="flex-1 bg-slate-500 overflow-auto p-6 flex justify-center">
              <div
                className="bg-white shadow-xl rounded"
                style={{
                  width: `${(8.5 * zoom) / 100 * 72}px`,
                  minHeight: `${(11 * zoom) / 100 * 72}px`,
                }}
              >
                <div className="p-6 text-sm">
                  {/* Header */}
                  <div className="text-right text-xs text-slate-500 mb-4">
                    Document ID: MH-LLP-2024-001
                  </div>

                  {/* Title Section */}
                  <div className="border-2 border-slate-800 mb-4">
                    <div className="grid grid-cols-2">
                      <div className="border-r border-slate-800 p-3 text-center">
                        <h1 className="text-base font-bold text-slate-900">MAGNELLEN</h1>
                        <p className="text-xs text-slate-600">Aviation Services</p>
                      </div>
                      <div className="p-3">
                        <h2 className="text-sm font-bold text-slate-900">LLP OPERATIONAL HISTORY</h2>
                        <p className="text-xs mt-1">
                          <span className="text-slate-600">Doc No.: </span>
                          <span className="font-semibold text-amber-600">MH-LLP-2024-001</span>
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-slate-800 p-2 bg-slate-50">
                      <p className="text-xs text-slate-700">
                        <span className="font-medium">Date: </span>24 October 2024
                      </p>
                    </div>
                  </div>

                  {currentPage === 1 && (
                    <>
                      {/* Info Table */}
                      <div className="border border-slate-300 mb-4 text-xs">
                        <div className="grid grid-cols-2 border-b border-slate-300">
                          <div className="p-2 border-r border-slate-300 bg-slate-50">
                            <p className="text-slate-500">Part Description</p>
                            <p className="font-medium text-slate-900">HPT Disk Stage 1</p>
                          </div>
                          <div className="p-2 bg-slate-50">
                            <p className="text-slate-500">Engine Model</p>
                            <p className="font-medium text-slate-900">V2527-A5</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 border-b border-slate-300">
                          <div className="p-2 border-r border-slate-300">
<p className="text-slate-500">LLP Part Number</p>
  <p className="font-mono font-semibold text-cyan-700">340-301-301-0</p>
                          </div>
                          <div className="p-2">
                            <p className="text-slate-500">Serial Number</p>
                            <p className="font-mono font-semibold text-cyan-700">HPT-7382-001</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="p-2 border-r border-slate-300">
                            <p className="text-slate-500">Engine Serial Number</p>
                            <p className="font-mono font-semibold text-cyan-700">ESN-V2527-A5-19842</p>
                          </div>
                          <div className="p-2">
                            <p className="text-slate-500">Life Limit</p>
                            <p className="font-semibold text-slate-900">20,000 FC</p>
                          </div>
                        </div>
                      </div>

                      {/* ON/OFF History Table */}
                      <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wide">
                        Installation & Removal History
                      </h3>
                      <div className="border border-slate-300 text-xs">
                        <div className="grid grid-cols-6 bg-slate-100 border-b border-slate-300 font-semibold">
                          <div className="p-1.5 border-r border-slate-300">Event</div>
                          <div className="p-1.5 border-r border-slate-300">Date</div>
                          <div className="p-1.5 border-r border-slate-300">TSN</div>
                          <div className="p-1.5 border-r border-slate-300">CSN</div>
                          <div className="p-1.5 border-r border-slate-300">Aircraft</div>
                          <div className="p-1.5">Reason</div>
                        </div>
                        <div className="grid grid-cols-6 border-b border-slate-200">
                          <div className="p-1.5 border-r border-slate-200 bg-emerald-50 text-emerald-700 font-medium">ON</div>
                          <div className="p-1.5 border-r border-slate-200">22 Mar 2019</div>
                          <div className="p-1.5 border-r border-slate-200 font-mono">0</div>
                          <div className="p-1.5 border-r border-slate-200 font-mono">0</div>
                          <div className="p-1.5 border-r border-slate-200">JA112A</div>
                          <div className="p-1.5">New</div>
                        </div>
                        <div className="grid grid-cols-6">
                          <div className="p-1.5 border-r border-slate-200 bg-amber-50 text-amber-700 font-medium">OFF</div>
                          <div className="p-1.5 border-r border-slate-200">15 Oct 2024</div>
                          <div className="p-1.5 border-r border-slate-200 font-mono">18,742</div>
                          <div className="p-1.5 border-r border-slate-200 font-mono">12,456</div>
                          <div className="p-1.5 border-r border-slate-200">JA112A</div>
                          <div className="p-1.5">LLP Limit</div>
                        </div>
                      </div>

                      {/* Summary Stats */}
                      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                        <div className="border border-slate-300 rounded p-2 text-center">
                          <p className="text-slate-500">Total TSN</p>
                          <p className="font-bold text-slate-900">18,742 FH</p>
                        </div>
                        <div className="border border-slate-300 rounded p-2 text-center">
                          <p className="text-slate-500">Total CSN</p>
                          <p className="font-bold text-slate-900">12,456 FC</p>
                        </div>
                        <div className="border border-slate-300 rounded p-2 text-center">
                          <p className="text-slate-500">Remaining</p>
                          <p className="font-bold text-emerald-600">7,544 FC</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-200 text-xs text-slate-500 text-center">
                        Page 1 of 2 | Magnellen Aviation Services
                      </div>
                    </>
                  )}

                  {currentPage === 2 && (
                    <>
                      <h3 className="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wide">
                        Certification & Compliance
                      </h3>
                      <div className="border border-slate-300 p-3 mb-4 text-xs">
                        <p className="text-slate-700 mb-3">
                          This document certifies that the above-referenced Life Limited Part
                          has been tracked and maintained in accordance with applicable
                          regulatory requirements and manufacturer guidelines.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-slate-500">Prepared By</p>
                            <p className="font-medium text-slate-900">J. Smith, Records Manager</p>
                            <p className="text-slate-500">Date: 24 Oct 2024</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Approved By</p>
                            <p className="font-medium text-slate-900">K. Tanaka, Chief Engineer</p>
                            <p className="text-slate-500">Date: 24 Oct 2024</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-2 border-t border-slate-200 text-xs text-slate-500 text-center">
                        Page 2 of 2 | Magnellen Aviation Services
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StatusBadge({ status }: { status: "verified" | "pending" | "discrepancy" }) {
  switch (status) {
    case "verified":
      return (
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Verified
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
          <AlertTriangle className="h-3 w-3" />
          Pending Review
        </Badge>
      )
    case "discrepancy":
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200 gap-1">
          <AlertCircle className="h-3 w-3" />
          Discrepancy Found
        </Badge>
      )
  }
}

function CrossCheckStatus({ status }: { status: "match" | "warning" | "missing" }) {
  switch (status) {
    case "match":
      return <CheckCircle2 className="h-4 w-4 text-emerald-600" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />
    case "missing":
      return <AlertCircle className="h-4 w-4 text-red-500" />
  }
}

function DocumentSection({
  section,
  isExpanded,
  onToggle,
}: {
  section: (typeof documentSections)[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const pdfUrl = section.id === "operational-history" ? "/documents/magnellen-llp-history.pdf" : null

  return (
    <Card className="border-slate-200">
      <CardHeader
        className="cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-slate-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-slate-400" />
              )}
              <CardTitle className="text-lg font-semibold text-slate-900">
                {section.title}
              </CardTitle>
            </div>
            <StatusBadge status={section.status} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              Updated: {section.lastUpdated}
            </span>
            {pdfUrl ? (
              <Link
                href="/mockup-2/folder/f1/f001/viewer"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Full PDF
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <ExternalLink className="h-3 w-3" />
                View Full PDF
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-1 ml-7">{section.description}</p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          {/* Key Data Summary - Full Width */}
          <div className="p-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-sky-600" />
                <span className="text-sm font-medium text-slate-700">
                  Key Data Summary
                </span>
              </div>
              {section.viewerLink && (
                <Link href={section.viewerLink}>
                  <Button size="sm" variant="outline" className="gap-1 h-7 text-xs">
                    <FileText className="h-3 w-3" />
                    View Document
                  </Button>
                </Link>
              )}
            </div>
              
            {/* Standard key data fields */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {section.keyData.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center py-2 px-3 rounded ${
                    item.status === "discrepancy"
                      ? "bg-amber-50 border border-amber-300"
                      : item.status === "success" 
                        ? "bg-emerald-50 border border-emerald-200" 
                        : item.highlight 
                          ? "bg-cyan-50/50 border border-cyan-100" 
                          : "bg-slate-50"
                  }`}
                >
                  <span
                    className={`text-sm flex items-center gap-2 ${
                      item.status === "discrepancy"
                        ? "font-medium text-amber-800"
                        : item.status === "success"
                          ? "font-medium text-emerald-800"
                          : item.highlight
                            ? "font-medium text-slate-700"
                            : "text-slate-500"
                    }`}
                  >
                    {item.status === "discrepancy" && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold cursor-help">!</span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-amber-600 text-white">
                          Numbers don't match
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {item.label}
                  </span>
                  <span
                    className={`text-sm font-mono ${
                      item.status === "discrepancy"
                        ? "font-semibold text-amber-700"
                        : item.status === "success"
                          ? "font-semibold text-emerald-700"
                          : item.highlight
                            ? "font-semibold text-cyan-700"
                            : "text-slate-900"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
              </div>

            {/* Operational History: Installation & Removal horizontal sections */}
            {section.id === "operational-history" && section.removalData && section.installationData && (
              <div className="grid grid-cols-2 gap-4 mt-3">
                {/* LLP Installation Date Section */}
                <div className="border border-slate-200 rounded-lg bg-slate-50/50 p-4">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                    <div className="w-2 h-2 rounded-full bg-slate-500" />
                    <span className="text-sm font-semibold text-slate-700">
                      {section.installationData.title}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-slate-800 mb-3">
                    {section.installationData.date}
                  </div>
                  <div className="space-y-2">
                    {section.installationData.fields.map((field, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                        <span className="text-sm text-slate-600">{field.label}</span>
                        <span className="text-sm font-mono font-semibold text-slate-900">{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* First Removal Date Section */}
                <div className="border border-zinc-300 rounded-lg bg-zinc-100/50 p-4">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                    <span className="text-sm font-semibold text-zinc-700">
                      {section.removalData.title}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-zinc-800 mb-3">
                    {section.removalData.date}
                  </div>
                  <div className="space-y-2">
                    {section.removalData.fields.map((field, idx) => (
                      <div key={idx} className="flex justify-between py-1 border-b border-zinc-200 last:border-0">
                        <span className="text-sm text-zinc-600">{field.label}</span>
                        <span className="text-sm font-mono font-semibold text-zinc-900">{field.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function F1EngineRecordsPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "operational-history",
    "authorized-release",
  ])

  // Define row groupings for the 2-column grid layout
  const rowGroups: Record<string, string[]> = {
    "operational-history": ["operational-history", "authorized-release"],
    "authorized-release": ["operational-history", "authorized-release"],
    "llp-status": ["llp-status", "incident-clearance"],
    "incident-clearance": ["llp-status", "incident-clearance"],
    "birth-record": ["birth-record"],
  }

  const toggleSection = (id: string) => {
    const rowSections = rowGroups[id] || [id]
    setExpandedSections((prev) => {
      const isExpanded = prev.includes(id)
      if (isExpanded) {
        // Collapse all sections in the row
        return prev.filter((s) => !rowSections.includes(s))
      } else {
        // Expand all sections in the row
        return [...new Set([...prev, ...rowSections])]
      }
    })
  }

  const expandAll = () => {
    setExpandedSections(documentSections.map((s) => s.id))
  }

  const collapseAll = () => {
    setExpandedSections([])
  }

  const matchCount = crossCheckVariables.filter((v) => v.status === "match").length
  const warningCount = crossCheckVariables.filter((v) => v.status === "warning").length
  const missingCount = crossCheckVariables.filter((v) => v.status === "missing").length

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 border-b bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/mockup-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to IATA Binder
                </Button>
              </Link>
              <div className="text-sm text-slate-500">
                IATA Binder / F1. Engine Records 1 / Back-to-Birth Documentation
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={expandAll}>
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
                <Download className="h-4 w-4 mr-2" />
                Export BTB Package
              </Button>
            </div>
          </div>
        </nav>

        {/* Project Header */}
        <div className="border-b bg-white px-6 py-4">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Back-to-Birth Records – Engine LLP Documentation
              </h1>
              <p className="text-lg text-slate-600 mt-1">F1 Engine Records 1</p>
              <div className="mt-3 flex items-center gap-6">
                <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                  <span className="text-sm font-medium text-sky-700">PN:</span>
                  <span className="text-lg font-bold text-sky-900 font-mono">340-301-301-0</span>
                </div>
                <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                  <span className="text-sm font-medium text-sky-700">SN:</span>
                  <span className="text-lg font-bold text-sky-900 font-mono">PA877995</span>
                </div>
                <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                  <span className="text-sm font-medium text-sky-700">Nomenclature:</span>
                  <span className="text-lg font-bold text-sky-900">DISK, LPT STG 4</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-slate-500">LLP Documentation Progress</div>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[85%] bg-cyan-600" />
            </div>
            <div className="text-sm font-semibold text-slate-900">85%</div>
          </div>
        </div>

        {/* Cross-Check Summary Bar */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Key Variables Cross-Check
              </h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {matchCount} Match
                </Badge>
                {warningCount > 0 && (
                  <Badge className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {warningCount} Warning
                  </Badge>
                )}
                {missingCount > 0 && (
                  <Badge className="bg-red-50 text-red-700 border-red-200 gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {missingCount} Missing
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Variables validated across all 5 document categories
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {crossCheckVariables.map((variable, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-help transition-colors ${
                      variable.status === "match"
                        ? "bg-slate-50 border-slate-200 hover:border-emerald-300"
                        : variable.status === "warning"
                        ? "bg-amber-50 border-amber-200 hover:border-amber-400"
                        : "bg-red-50 border-red-200 hover:border-red-400"
                    }`}
                  >
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">
                        {variable.label}
                      </p>
                      <p className="text-sm font-semibold font-mono text-slate-900">
                        {variable.value}
                      </p>
                    </div>
                    <CrossCheckStatus status={variable.status} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p className="font-medium mb-1">Extracted from:</p>
                  <ul className="text-xs space-y-0.5">
                    {variable.sources.map((source, i) => (
                      <li key={i}>• {source}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Main Content - Document Sections */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {documentSections.map((section) => (
              <DocumentSection
                key={section.id}
                section={section}
                isExpanded={expandedSections.includes(section.id)}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer Summary */}
        <div className="border-t bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-sm text-slate-600">
                <span className="font-medium text-slate-900">5</span> Document
                Categories
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-medium text-emerald-600">4</span> Verified
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-medium text-amber-600">1</span> Pending
                Review
              </div>
            </div>
            <p className="text-sm text-slate-500">
              This engine&apos;s LLP records are complete, traceable, and ready for
              compliance review.
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
