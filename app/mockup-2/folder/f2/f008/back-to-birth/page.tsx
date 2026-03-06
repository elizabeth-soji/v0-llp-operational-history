"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ChevronLeft,
  Download,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Timeline events data - ordered chronologically from latest to earliest (descending)
const timelineEvents = [
  {
    id: "authorized-release",
    title: "Authorized Release Certificate (FAA 8130-3)",
    date: "27 Jul 2019",
    category: "Maintenance",
    dotColor: "bg-emerald-500",
    description: "Airworthiness release certificate confirming the LLP has been inspected and is approved for return to service.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f2/f008/viewer/arc",
    imagePreview: "/documents/f2-release-certificate.jpg",
    keyData: [
      { label: "Part Number", value: "1864M90P04", highlight: true },
      { label: "Serial Number", value: "TMT1AD99", highlight: true },
      { label: "Status", value: "OVERHAULED", highlight: true, status: "success" },
      { label: "Date", value: "27th July 2019", highlight: true },
      { label: "Engine Serial Number", value: "890434", highlight: true },
      { label: "LLP TSN", value: "18734", highlight: true },
      { label: "LLP CSN", value: "11962", highlight: true },
    ],
    parties: [
      { name: "Imran Ibrahim", role: "Authorized Signatory" },
      { name: "GE Aviation Engine Services Singapore", role: "Approved Organization" },
    ],
  },
  {
    id: "llp-status-1",
    title: "LLP Status Report",
    date: "29 May 2019",
    category: "Operations",
    dotColor: "bg-red-500",
    description: "Life Limited Part status and remaining life calculation. Data discrepancy detected in part/serial numbers.",
    documents: 1,
    status: "flagged" as const,
    statusLabel: "AI Findings",
    viewerLink: "/mockup-2/folder/f2/f008/viewer/llp-status",
    imagePreview: "/documents/f2-release-certificate.jpg",
    keyData: [
      { label: "Engine Model", value: "CFM56-7B26", highlight: true },
      { label: "Engine Serial Number", value: "890434", highlight: true },
      { label: "Engine TSN", value: "43616", highlight: true },
      { label: "Engine CSN", value: "24915", highlight: true },
      { label: "LLP Part Number", value: "1864M90P04", highlight: true, status: "discrepancy" },
      { label: "LLP Serial Number", value: "TMT1AD99", highlight: true, status: "discrepancy" },
      { label: "LLP TSN", value: "18734:00", highlight: true },
      { label: "LLP CSN", value: "11962", highlight: true },
      { label: "Date", value: "29th MAY 2019", highlight: true },
      { label: "Nomenclature", value: "SHAFT, REAR HPT" },
    ],
    parties: [
      { name: "GE Aviation", role: "MRO Provider" },
      { name: "Lufthansa Technik AG", role: "Customer" },
    ],
  },
  {
    id: "llp-status-2",
    title: "LLP Status Report",
    date: "9 May 2019",
    category: "Operations",
    dotColor: "bg-emerald-500",
    description: "Life Limited Part status and remaining life calculation at time of shop visit.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f2/f008/viewer/llp-status",
    imagePreview: "/documents/f2-release-certificate.jpg",
    keyData: [
      { label: "Engine Serial Number", value: "890434", highlight: true },
      { label: "Engine TSN", value: "43616", highlight: true },
      { label: "Engine CSN", value: "24915", highlight: true },
      { label: "LLP Part Number", value: "1864M90P04", highlight: true },
      { label: "LLP Serial Number", value: "TMT1AD99", highlight: true },
      { label: "LLP TSN", value: "18734:00", highlight: true },
      { label: "LLP CSN", value: "11962", highlight: true },
      { label: "Date", value: "9th MAY 2019", highlight: true },
      { label: "Nomenclature", value: "SHAFT, REAR HPT" },
    ],
    parties: [
      { name: "GE Aviation", role: "MRO Provider" },
      { name: "Lufthansa Technik AG", role: "Customer" },
    ],
  },
  {
    id: "incident-clearance-1",
    title: "Incident / Accident Clearance Statement",
    date: "8 May 2019",
    category: "Operations",
    dotColor: "bg-emerald-500",
    description: "Certification that the engine and all installed parts have no incident or accident history.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f2/f008/viewer/incident-clearance",
    imagePreview: "/documents/f2-release-certificate.jpg",
    keyData: [
      { label: "Document Date", value: "29th July 2019", highlight: true },
      { label: "Engine Serial Number", value: "890434", highlight: true },
      { label: "Engine Model", value: "CFM56-7BE", highlight: true },
      { label: "Period", value: "2nd Dec 2016 to 8th May 2019", highlight: true },
      { label: "Engine TSN", value: "43616", highlight: true },
      { label: "Engine CSN", value: "24915", highlight: true },
      { label: "2nd Dec 2016 - Engine TSN", value: "37899", highlight: true },
      { label: "2nd Dec 2016 - Engine CSN", value: "20784", highlight: true },
    ],
    parties: [
      { name: "GE Aviation", role: "MRO Provider" },
      { name: "Lufthansa Technik AG", role: "Customer" },
    ],
  },
  {
    id: "incident-clearance-2",
    title: "Incident / Accident Clearance Statement",
    date: "30 Nov 2016",
    category: "Operations",
    dotColor: "bg-emerald-500",
    description: "Certification that the engine and all installed parts have no incident or accident history.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f2/f008/viewer/incident-clearance",
    imagePreview: "/documents/f2-release-certificate.jpg",
    keyData: [
      { label: "Document Date", value: "30th Nov 2016", highlight: true },
      { label: "Engine Serial Number", value: "890434", highlight: true },
      { label: "Engine Model", value: "CFM56-7BE", highlight: true },
    ],
    parties: [
      { name: "Lufthansa Technik AG", role: "MRO Provider" },
    ],
  },
  {
    id: "operational-history",
    title: "Operational History – ON / OFF Log",
    date: "Date Unknown",
    category: "Maintenance",
    dotColor: "bg-red-500",
    description: "Complete installation and removal history tracking the LLP through all engine installations with time/cycle accumulation. Data discrepancy detected.",
    documents: 1,
    status: "flagged" as const,
    statusLabel: "AI Findings",
    viewerLink: "/mockup-2/folder/f2/f008/viewer",
    imagePreview: "/documents/f2-release-certificate.jpg",
    keyData: [
      { label: "LLP Part Number", value: "1864M90P04", highlight: true, status: "discrepancy" },
      { label: "LLP Serial Number", value: "TMT1AD99", highlight: true, status: "discrepancy" },
      { label: "Engine Serial Number", value: "890434", highlight: true },
      { label: "Engine Model", value: "CFM56-7BE", highlight: true },
      { label: "At 1st removal LLP TSN", value: "13028", highlight: true },
      { label: "At 1st removal LLP CSN", value: "7833", highlight: true },
      { label: "At 1st removal Engine TSN", value: "37910", highlight: true },
      { label: "At 1st removal Engine CSN", value: "20736", highlight: true },
      { label: "At Installation LLP TSN", value: "0", highlight: true },
      { label: "At Installation LLP CSN", value: "0", highlight: true },
      { label: "At Installation Engine TSN", value: "24882", highlight: true },
      { label: "At Installation Engine CSN", value: "12953", highlight: true },
    ],
    parties: [
      { name: "GE Aviation Engine Services", role: "MRO Provider" },
    ],
  },
  {
    id: "on-log",
    title: "On Log",
    date: "20 Aug 2010",
    category: "Maintenance",
    dotColor: "bg-emerald-500",
    description: "Installation record documenting the LLP being installed onto the engine.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f2/f008/viewer",
    imagePreview: "/documents/f2-release-certificate.jpg",
    keyData: [
      { label: "Date", value: "20th August 2010", highlight: true },
      { label: "Part Number", value: "1864M90P04", highlight: true },
      { label: "Serial Number", value: "TMT1AD99", highlight: true },
      { label: "Engine Serial Number", value: "890434", highlight: true },
    ],
    parties: [
      { name: "Lufthansa Technik AG", role: "MRO Provider" },
    ],
  },
  {
    id: "birth-record",
    title: "Engine Data Submittal (Birth Record)",
    date: "29 Dec 2008",
    category: "Birth/Manufacturing",
    dotColor: "bg-emerald-500",
    description: "Original manufacturing and certification documentation. Part manufactured by GE Aviation with full material traceability.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f2/f008/viewer/birth-record",
    imagePreview: "/documents/f2-release-certificate.jpg",
    keyData: [
      { label: "Nomenclature", value: "AFT SHFT" },
      { label: "Part Number", value: "1864M90P04", highlight: true },
      { label: "Serial Number", value: "TMT1AD99", highlight: true },
      { label: "Manufacturer", value: "GE Aviation" },
      { label: "Manufacturing Date", value: "29 Dec 2008" },
      { label: "Manufacturing Location", value: "USA" },
    ],
    parties: [
      { name: "GE Aviation", role: "Manufacturer" },
    ],
  },
]

// Cross-check variables
const crossCheckVariables = [
  { label: "LLP Part Number", value: "1864M90P04", status: "match" as const, sources: ["Birth Record", "LLP Status", "ARC", "ON/OFF Log"] },
  { label: "LLP Serial Number", value: "TMT1AD99", status: "match" as const, sources: ["Birth Record", "LLP Status", "ARC", "ON/OFF Log"] },
  { label: "Engine Serial Number", value: "890434", status: "match" as const, sources: ["Birth Record", "LLP Status", "ARC", "ON/OFF Log"] },
  { label: "TSN", value: "18734", status: "match" as const, sources: ["LLP Status", "ARC", "ON/OFF Log"] },
  { label: "CSN", value: "11962", status: "match" as const, sources: ["LLP Status", "ARC", "ON/OFF Log"] },
]

function CrossCheckStatus({ status }: { status: "match" | "warning" | "missing" }) {
  if (status === "match") {
    return <CheckCircle2 className="h-4 w-4 text-emerald-600" />
  } else if (status === "warning") {
    return <AlertTriangle className="h-4 w-4 text-amber-600" />
  }
  return <AlertTriangle className="h-4 w-4 text-red-600" />
}

export default function F2EngineRecordsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string>("operational-history")
  const [resolvedDiscrepancies, setResolvedDiscrepancies] = useState<Record<string, string[]>>({})
  const [verifiedPendingEvents, setVerifiedPendingEvents] = useState<string[]>([])
  const [verifiedFlaggedEvents, setVerifiedFlaggedEvents] = useState<string[]>([])
  const [discrepancyDialog, setDiscrepancyDialog] = useState<{
    open: boolean
    eventId: string
    field: { label: string; value: string } | null
  }>({ open: false, eventId: "", field: null })
  const [pendingReviewDialog, setPendingReviewDialog] = useState<{
    open: boolean
    event: typeof timelineEvents[0] | null
  }>({ open: false, event: null })
  const [pdfPreviewDialog, setPdfPreviewDialog] = useState<{
    open: boolean
    event: typeof timelineEvents[0] | null
  }>({ open: false, event: null })
  const [flaggedReviewDialog, setFlaggedReviewDialog] = useState<{
    open: boolean
    event: typeof timelineEvents[0] | null
  }>({ open: false, event: null })
  const [exportReportDialog, setExportReportDialog] = useState(false)
  
  const selectedEventData = timelineEvents.find(e => e.id === selectedEvent)
  
  const matchCount = crossCheckVariables.filter((v) => v.status === "match").length
  const warningCount = crossCheckVariables.filter((v) => v.status === "warning").length

  // Check if a specific field has been resolved
  const isFieldResolved = (eventId: string, label: string) => {
    return resolvedDiscrepancies[eventId]?.includes(label) || false
  }

  // Get the effective status of an event (considering resolved discrepancies and verified pending/flagged)
  const getEffectiveEventStatus = (event: typeof timelineEvents[0]) => {
    // Check if pending event was manually verified
    if (event.status === "pending" && verifiedPendingEvents.includes(event.id)) {
      return {
        ...event,
        status: "verified" as const,
        statusLabel: "Verified",
        dotColor: "bg-emerald-500"
      }
    }
    
    if (event.status !== "flagged") return event
    
    const discrepancyFields = event.keyData.filter(k => k.status === "discrepancy")
    const allResolved = discrepancyFields.every(field => isFieldResolved(event.id, field.label))
    const isVerifiedAndSigned = verifiedFlaggedEvents.includes(event.id)
    
    // Mark as verified if EITHER condition is met:
    // 1. All discrepancy fields are manually resolved (green) - auto-verifies the status
    // 2. User clicked "Verify and sign" which resolves all fields and marks as verified
    if (allResolved && discrepancyFields.length > 0) {
      return {
        ...event,
        status: "verified" as const,
        statusLabel: "Verified",
        dotColor: "bg-emerald-500"
      }
    }
    return event
  }

  // Handle resolving a discrepancy
  const handleResolveDiscrepancy = () => {
    if (!discrepancyDialog.field || !discrepancyDialog.eventId) return
    
    setResolvedDiscrepancies(prev => ({
      ...prev,
      [discrepancyDialog.eventId]: [
        ...(prev[discrepancyDialog.eventId] || []),
        discrepancyDialog.field!.label
      ]
    }))
    setDiscrepancyDialog({ open: false, eventId: "", field: null })
  }

  // Handle keeping a field flagged
  const handleKeepFlagged = () => {
    setDiscrepancyDialog({ open: false, eventId: "", field: null })
  }

  // Open discrepancy dialog
  const openDiscrepancyDialog = (eventId: string, field: { label: string; value: string }) => {
    setDiscrepancyDialog({ open: true, eventId, field })
  }

  // Handle verifying a pending event
  const handleVerifyPending = () => {
    if (pendingReviewDialog.event) {
      setVerifiedPendingEvents(prev => [...prev, pendingReviewDialog.event!.id])
      setPendingReviewDialog({ open: false, event: null })
    }
  }

  // Open pending review dialog
  const openPendingReviewDialog = (event: typeof timelineEvents[0]) => {
    setPendingReviewDialog({ open: true, event })
  }

  // Handle verifying a flagged event - also resolves all discrepancy fields
  const handleVerifyFlagged = () => {
    if (flaggedReviewDialog.event) {
      const event = flaggedReviewDialog.event
      // Resolve all discrepancy fields for this event
      const discrepancyFields = event.keyData.filter(k => k.status === "discrepancy")
      const newResolved: Record<string, string[]> = { ...resolvedDiscrepancies }
      discrepancyFields.forEach(field => {
        if (!newResolved[event.id]) {
          newResolved[event.id] = []
        }
        if (!newResolved[event.id].includes(field.label)) {
          newResolved[event.id].push(field.label)
        }
      })
      setResolvedDiscrepancies(newResolved)
      setVerifiedFlaggedEvents(prev => [...prev, event.id])
      setFlaggedReviewDialog({ open: false, event: null })
    }
  }

  // Open flagged review dialog
  const openFlaggedReviewDialog = (event: typeof timelineEvents[0]) => {
    setFlaggedReviewDialog({ open: true, event })
  }

  // Open PDF preview dialog
  const openPdfPreviewDialog = (event: typeof timelineEvents[0]) => {
    setPdfPreviewDialog({ open: true, event })
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 border-b bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/mockup-2/folder/f2/f008">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Life Limited Parts
                </Button>
              </Link>
              <div className="text-sm text-slate-500">
                IATA Binder / F2. Engine Records 2 / F 008. Back-to-Birth Documentation
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                className="bg-slate-900 hover:bg-slate-800"
                onClick={() => setExportReportDialog(true)}
              >
                <Download className="h-4 w-4 mr-2" />
                Export LLP Report
              </Button>
            </div>
          </div>
        </nav>

        {/* Header with Key Info */}
        <div className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Back-to-Birth Records
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-slate-600">LLP Traceability Timeline</p>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">Documents ingested: 6th March 2026</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-sky-700">PN:</span>
                <span className="text-lg font-bold text-sky-900 font-mono">1864M90P04</span>
              </div>
              <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-sky-700">SN:</span>
                <span className="text-lg font-bold text-sky-900 font-mono">TMT1AD99</span>
              </div>
              <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-sky-700">Nomenclature:</span>
                <span className="text-lg font-bold text-sky-900">SHAFT, REAR HPT</span>
              </div>
              <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-sky-700">First installation:</span>
                <span className="text-lg font-bold text-sky-900">29/12/2009</span>
              </div>
              <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-sky-700">Cycle date:</span>
                <span className="text-lg font-bold text-sky-900">29/12/2011</span>
              </div>
              <div className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-sky-700">TT:</span>
                <span className="text-lg font-bold text-sky-900">5000 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Timeline & Detail Panel */}
        <div className="flex h-[calc(100vh-220px)]">
          {/* Left: Timeline */}
          <div className="w-[480px] border-r bg-white overflow-y-auto">
            <div className="p-4">
              {timelineEvents.map((event, index) => {
                const effectiveEvent = getEffectiveEventStatus(event)
                return (
                <div key={event.id} className="relative">
                  {/* Connecting Line */}
                  {index < timelineEvents.length - 1 && (
                    <div className="absolute left-3 top-6 w-0.5 h-full bg-slate-200" />
                  )}
                  
                  {/* Timeline Entry */}
                  <button
                    onClick={() => setSelectedEvent(event.id)}
                    className={`w-full text-left mb-4 transition-all ${
                      selectedEvent === event.id ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Dot */}
                      <div className={`relative z-10 w-6 h-6 rounded-full ${effectiveEvent.dotColor} flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedEvent === event.id ? "ring-4 ring-offset-2" : ""
                      }`} style={{ 
                        ringColor: selectedEvent === event.id ? `${effectiveEvent.dotColor.replace('bg-', 'rgb(var(--')})` : undefined 
                      }}>
                        {effectiveEvent.status === "flagged" ? (
                          <AlertTriangle className="h-3 w-3 text-white" />
                        ) : effectiveEvent.status === "pending" ? (
                          <Clock className="h-3 w-3 text-white" />
                        ) : (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className={`flex-1 pb-4 ${
                        selectedEvent === event.id 
                          ? "bg-slate-50 -mx-2 px-2 py-2 rounded-lg border border-slate-200" 
                          : ""
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-lg font-bold text-slate-900 mb-0.5">{event.title.split(" – ")[0].split(" (")[0]}</p>
                            <p className="font-semibold text-slate-700">{event.date}</p>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            event.category === "Maintenance" 
                              ? "bg-blue-100 text-blue-700" 
                              : event.category === "Operations"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-cyan-100 text-cyan-700"
                          }`}>
                            {event.category}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-2">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <FileText className="h-3 w-3" />
                            <span>{event.documents} document</span>
                          </div>
                          <Badge className={`text-[10px] px-1.5 py-0 ${
                            effectiveEvent.status === "verified" 
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                              : effectiveEvent.status === "flagged"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-amber-100 text-amber-700 border-amber-200"
                          }`}>
                            {effectiveEvent.statusLabel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              )})}
            
            </div>
          </div>

          {/* Right: Detail Panel */}
          <div className="flex-1 bg-slate-50 overflow-y-auto">
          {selectedEventData && (() => {
              const effectiveSelectedEvent = getEffectiveEventStatus(selectedEventData)
              return (
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-slate-900">{selectedEventData.title}</h2>
                      <Badge className={`${
                        effectiveSelectedEvent.status === "verified" 
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                          : effectiveSelectedEvent.status === "flagged"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                      }`}>
                        {effectiveSelectedEvent.statusLabel}
                      </Badge>
                    </div>
                    <p className="text-slate-600">{selectedEventData.description}</p>
                  </div>
                  {selectedEventData.viewerLink && (
                    <Button className="gap-2" onClick={() => openPdfPreviewDialog(selectedEventData)}>
                      <Eye className="h-4 w-4" />
                      View Document
                    </Button>
                  )}
                </div>

                {/* Date, Status & Parties */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Date</p>
                          <p className="font-semibold text-slate-900">{selectedEventData.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Status</p>
                          <div className="flex items-center gap-2">
                            <p className={`font-semibold ${
                              effectiveSelectedEvent.status === "verified" 
                                ? "text-emerald-600" 
                                : effectiveSelectedEvent.status === "flagged"
                                  ? "text-red-600"
                                  : "text-amber-600"
                            }`}>
                              {effectiveSelectedEvent.statusLabel}
                            </p>
                            {effectiveSelectedEvent.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openPendingReviewDialog(selectedEventData)}
                                className="h-6 px-2 text-xs text-amber-700 border-amber-300 hover:bg-amber-50"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Verify and sign
                              </Button>
                            )}
                            {effectiveSelectedEvent.status === "flagged" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openFlaggedReviewDialog(selectedEventData)}
                                className="h-6 px-2 text-xs text-red-700 border-red-300 hover:bg-red-50"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Verify and sign
                              </Button>
                            )}
                            {effectiveSelectedEvent.status === "verified" && selectedEventData.viewerLink && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openPdfPreviewDialog(selectedEventData)}
                                className="h-6 px-2 text-xs text-slate-600 border-slate-300 hover:bg-slate-50"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View PDF
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedEventData.parties && selectedEventData.parties.length > 0 && (
                      <>
                        <div className="border-t border-slate-100 pt-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-slate-500" />
                            <span className="text-sm font-medium text-slate-600">Parties Involved</span>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-1">
                            {selectedEventData.parties.map((party, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-900">{party.name}</span>
                                <span className="text-xs text-slate-400">({party.role})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Key Data Summary */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-700 mb-3">Key Data Summary</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEventData.keyData.map((item, idx) => {
                        const isResolved = item.status === "discrepancy" && isFieldResolved(selectedEventData.id, item.label)
                        const effectiveStatus = isResolved ? "success" : item.status
                        const isClickable = item.status === "discrepancy" && !isResolved
                        
                        return (
                          <div
                            key={idx}
                            onClick={() => isClickable && openDiscrepancyDialog(selectedEventData.id, item)}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                              effectiveStatus === "discrepancy"
                                ? "bg-red-50 border border-red-200 cursor-pointer hover:bg-red-100 transition-colors"
                                : effectiveStatus === "success"
                                  ? "bg-emerald-50 border border-emerald-200"
                                  : item.highlight
                                    ? "bg-cyan-50 border border-cyan-100"
                                    : "bg-slate-50"
                            }`}
                          >
                            <span className={`text-sm ${
                              effectiveStatus === "discrepancy"
                                ? "text-red-800 font-medium"
                                : effectiveStatus === "success"
                                  ? "text-emerald-800 font-medium"
                                  : item.highlight
                                    ? "text-slate-700 font-medium"
                                    : "text-slate-500"
                            }`}>
                              {effectiveStatus === "discrepancy" && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold cursor-pointer mr-2">!</span>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="bg-red-600 text-white">
                                    Click to review AI finding
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {isResolved && (
                                <CheckCircle2 className="inline-block w-4 h-4 text-emerald-600 mr-2" />
                              )}
                              {item.label}
                            </span>
                            <span className={`text-sm font-mono ${
                              effectiveStatus === "discrepancy"
                                ? "font-semibold text-red-700"
                                : effectiveStatus === "success"
                                  ? "font-semibold text-emerald-700"
                                  : item.highlight
                                    ? "font-semibold text-cyan-700"
                                    : "text-slate-900"
                            }`}>
                              {item.value}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Installation & Removal Data for Operational History */}
                {selectedEventData.id === "operational-history" && selectedEventData.installationData && selectedEventData.removalData && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                          <div className="w-2 h-2 rounded-full bg-slate-500" />
                          <span className="font-semibold text-slate-700">
                            {selectedEventData.installationData.title}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-slate-800 mb-3">
                          {selectedEventData.installationData.date}
                        </div>
                        <div className="space-y-2">
                          {selectedEventData.installationData.fields.map((field, idx) => (
                            <div key={idx} className="flex justify-between py-1 border-b border-slate-100 last:border-0">
                              <span className="text-sm text-slate-600">{field.label}</span>
                              <span className="text-sm font-mono font-semibold text-slate-900">{field.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                          <div className="w-2 h-2 rounded-full bg-zinc-500" />
                          <span className="font-semibold text-zinc-700">
                            {selectedEventData.removalData.title}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-zinc-800 mb-3">
                          {selectedEventData.removalData.date}
                        </div>
                        <div className="space-y-2">
                          {selectedEventData.removalData.fields.map((field, idx) => (
                            <div key={idx} className="flex justify-between py-1 border-b border-zinc-100 last:border-0">
                              <span className="text-sm text-zinc-600">{field.label}</span>
                              <span className="text-sm font-mono font-semibold text-zinc-900">{field.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Document Preview */}
                {selectedEventData.imagePreview && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-500" />
                          <h3 className="font-semibold text-slate-700">Documentation ({selectedEventData.documents})</h3>
                        </div>
                        {selectedEventData.viewerLink && (
                          <Button size="sm" variant="outline" className="gap-1" onClick={() => openPdfPreviewDialog(selectedEventData)}>
                            <ExternalLink className="h-3 w-3" />
                            Open Full View
                          </Button>
                        )}
                      </div>
                      <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-100">
                        <img
                          src={selectedEventData.imagePreview}
                          alt={selectedEventData.title}
                          className="w-full h-64 object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )})()}
          </div>
        </div>

        {/* Footer Summary Bar */}
        <div className="border-t bg-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              <span className="font-semibold">{timelineEvents.length}</span> Events in Timeline
            </span>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {matchCount} Variables Match
            </Badge>
            {warningCount > 0 && (
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
                <AlertTriangle className="h-3 w-3" />
                {warningCount} Warning
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-500">
            Review timeline for complete traceability details
          </p>
        </div>
      </div>

      {/* Discrepancy Confirmation Dialog */}
      <Dialog open={discrepancyDialog.open} onOpenChange={(open) => !open && setDiscrepancyDialog({ open: false, eventId: "", field: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Review Discrepancy
            </DialogTitle>
            <DialogDescription>
              A potential data discrepancy has been flagged for this field. Please review and confirm.
            </DialogDescription>
          </DialogHeader>
          
          {discrepancyDialog.field && (
            <div className="py-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-amber-800">{discrepancyDialog.field.label}</span>
                  <span className="text-sm font-mono font-semibold text-amber-700">{discrepancyDialog.field.value}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                This value has been flagged because it may not match expected records. You can verify it as correct or keep it flagged for further review.
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleKeepFlagged}>
              Keep Flagged
            </Button>
            <Button onClick={handleResolveDiscrepancy} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Verify as Correct
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pending Review Dialog */}
      <Dialog open={pendingReviewDialog.open} onOpenChange={(open) => !open && setPendingReviewDialog({ open: false, event: null })}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-500" />
              Review Pending Document
            </DialogTitle>
            <DialogDescription>
              Review the document and mark it as verified or keep it pending for further review.
            </DialogDescription>
          </DialogHeader>
          
          {pendingReviewDialog.event && (
            <div className="py-4">
              {/* Document Information */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-slate-900 mb-2">{pendingReviewDialog.event.title}</h4>
                <p className="text-sm text-slate-600 mb-3">{pendingReviewDialog.event.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {pendingReviewDialog.event.keyData.slice(0, 4).map((item, idx) => (
                    <div key={idx}>
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="font-mono text-sm font-semibold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Preview */}
              <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Document Preview</span>
                </div>
                <div className="bg-white p-4 h-64 flex items-center justify-center">
                  {pendingReviewDialog.event.imagePreview ? (
                    <img 
                      src={pendingReviewDialog.event.imagePreview} 
                      alt={pendingReviewDialog.event.title}
                      className="max-h-full max-w-full object-contain rounded border border-slate-200"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-28 h-36 mx-auto bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center mb-3">
                        <FileText className="h-10 w-10 text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600">{pendingReviewDialog.event.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{pendingReviewDialog.event.date}</p>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Verify that all documentation is complete and accurate before marking as verified.
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setPendingReviewDialog({ open: false, event: null })}>
              Cancel
            </Button>
<Button onClick={handleVerifyPending} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Verify and sign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Flagged Review Dialog */}
      <Dialog open={flaggedReviewDialog.open} onOpenChange={(open) => !open && setFlaggedReviewDialog({ open: false, event: null })}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-500" />
              Review Flagged Document
            </DialogTitle>
            <DialogDescription>
              Review the document with issues and mark it as verified after resolving findings.
            </DialogDescription>
          </DialogHeader>
          
          {flaggedReviewDialog.event && (
            <div className="py-4">
              {/* Document Information */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-slate-900 mb-2">{flaggedReviewDialog.event.title}</h4>
                <p className="text-sm text-slate-600 mb-3">{flaggedReviewDialog.event.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {flaggedReviewDialog.event.keyData.slice(0, 4).map((item, idx) => (
                    <div key={idx}>
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="font-mono text-sm font-semibold text-slate-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Preview */}
              <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
                  <span className="text-sm font-medium text-slate-700">Document Preview</span>
                </div>
                <div className="bg-white p-4 h-64 flex items-center justify-center">
                  <img 
                    src="/documents/f2-release-certificate.jpg" 
                    alt="LLP Status Report"
                    className="max-h-full max-w-full object-contain rounded border border-slate-200"
                  />
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Verify that all issues have been reviewed and addressed before marking as verified.
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setFlaggedReviewDialog({ open: false, event: null })}>
              Cancel
            </Button>
            <Button onClick={handleVerifyFlagged} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Verify and sign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Dialog */}
      <Dialog open={pdfPreviewDialog.open} onOpenChange={(open) => !open && setPdfPreviewDialog({ open: false, event: null })}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-500" />
              Document Preview
            </DialogTitle>
            {pdfPreviewDialog.event && (
              <DialogDescription>
                {pdfPreviewDialog.event.title}
              </DialogDescription>
            )}
          </DialogHeader>
          
          {pdfPreviewDialog.event && (
            <div className="py-2">
              {/* Document Information Header */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Date</p>
                    <p className="font-semibold text-slate-900">{pdfPreviewDialog.event.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Documents</p>
                    <p className="font-semibold text-slate-900">{pdfPreviewDialog.event.documents} document(s)</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">Verified</Badge>
                  </div>
                </div>
              </div>

              {/* PDF Preview Area */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-slate-800">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">{pdfPreviewDialog.event.title}.pdf</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-[50vh] flex items-center justify-center bg-slate-100">
                  {pdfPreviewDialog.event.imagePreview ? (
                    <img 
                      src={pdfPreviewDialog.event.imagePreview} 
                      alt="Document preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-48 h-64 mx-auto bg-white rounded-lg shadow-lg border border-slate-200 flex flex-col items-center justify-center mb-4">
                        <FileText className="h-16 w-16 text-slate-300 mb-4" />
                        <div className="w-32 h-2 bg-slate-200 rounded mb-2"></div>
                        <div className="w-24 h-2 bg-slate-200 rounded mb-2"></div>
                        <div className="w-28 h-2 bg-slate-200 rounded mb-4"></div>
                        <div className="w-20 h-2 bg-slate-200 rounded"></div>
                      </div>
                      <p className="text-sm text-slate-600">{pdfPreviewDialog.event.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{pdfPreviewDialog.event.date}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {pdfPreviewDialog.event?.viewerLink && (
              <Link href={pdfPreviewDialog.event.viewerLink}>
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  View Full Details
                </Button>
              </Link>
            )}
            <Button onClick={() => setPdfPreviewDialog({ open: false, event: null })}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export LLP Documentation Report Dialog */}
      <Dialog open={exportReportDialog} onOpenChange={setExportReportDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-600" />
              LLP Documentation Report
            </DialogTitle>
            <DialogDescription>
              Complete documentation package for Life Limited Part GFF5H1TD
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-2">
            {/* Report Information Header */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Part Number</p>
                  <p className="font-mono font-semibold text-slate-900">2116M25P01</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Serial Number</p>
                  <p className="font-mono font-semibold text-slate-900">GFF5H1TD</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Description</p>
                  <p className="font-semibold text-slate-900">SEAL, AIR HPC</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Engine Type</p>
                  <p className="font-semibold text-slate-900">CFM56</p>
                </div>
              </div>
            </div>

            {/* Document Preview Area */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Documentation Check for Life Limited Parts</span>
                <div className="flex items-center gap-2">
                  <a href="/documents/llp-documentation-check.png" download>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">
                      <Download className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
              <div className="h-[50vh] overflow-auto bg-white flex items-center justify-center p-4">
                <img 
                  src="/documents/llp-documentation-check.png" 
                  alt="LLP Documentation Check"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Document Contents */}
            <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-2">Report Contents</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-slate-700">Documentation Check Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-slate-700">Life Limited Part History Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-slate-700">EASA Form 1 Release Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-slate-700">Non-Incident Statement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-slate-700">LLP Status Report</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  <span className="text-slate-700">Technical Log Records</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setExportReportDialog(false)}>
              Close
            </Button>
            <a href="/documents/llp-documentation-report.pdf" download>
              <Button className="bg-slate-900 hover:bg-slate-800">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
