"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
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
    id: "operational-history",
    title: "Operational History – ON / OFF Log",
    date: "2 Feb 2022",
    dotColor: "bg-emerald-500",
    description: "Complete installation and removal history tracking the LLP through all engine installations with time/cycle accumulation.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f1/f008/viewer",
    imagePreview: "/documents/magellan-llp-history.jpg",
    keyData: [
      { label: "LLP Part Number", value: "340-301-301-0", highlight: true },
      { label: "LLP Serial Number", value: "PA877995", highlight: true },
      { label: "Engine Serial Number", value: "963481", highlight: true },
      { label: "Engine Model", value: "CFM56-7B26E", highlight: true },
      { label: "LLP TSN at Removal", value: "30562", highlight: true },
      { label: "LLP CSN at Removal", value: "16501", highlight: true },
    ],
    parties: [
      { name: "Magellan Aviation Services", role: "MRO Provider" },
    ],
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
  },
  {
    id: "authorized-release",
    title: "Authorized Release Certificate (FAA 8130-3)",
    date: "13 Nov 2020",
    dotColor: "bg-emerald-500",
    description: "Airworthiness release certificate confirming the LLP has been inspected and is approved for return to service.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f1/f008/viewer/arc",
    imagePreview: "/documents/sia-auth-release-certificate.jpg",
    keyData: [
      { label: "Part Number", value: "340-301-301-0", highlight: true },
      { label: "Serial Number", value: "PA877995", highlight: true },
      { label: "Status", value: "INSPECTED", highlight: true, status: "success" },
      { label: "Date", value: "13th November 2020", highlight: true },
      { label: "Engine Serial Number", value: "962858", highlight: true },
      { label: "LLP TSN", value: "30562", highlight: true },
      { label: "LLP CSN", value: "16501", highlight: true },
    ],
    parties: [
      { name: "Jose Guadalupe Araujo Balderas", role: "Authorized Signatory" },
      { name: "SAFRAN Aircraft Engine Services Americas", role: "Approved Organization" },
    ],
  },
  {
    id: "llp-status",
    title: "LLP Status Report (at Removal)",
    date: "21 Jun 2020",
    dotColor: "bg-red-500",
    description: "Life Limited Part status and remaining life calculation at the time of removal from engine. Data discrepancy detected in part/serial numbers.",
    documents: 1,
    status: "flagged" as const,
    statusLabel: "Issues Found",
    viewerLink: "/mockup-2/folder/f1/f008/viewer/llp-status",
    imagePreview: "/documents/sia-llp-status.jpg",
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
    parties: [
      { name: "Serkan ASLAN", role: "Powerplant Engineer" },
      { name: "Pegasus Airlines", role: "Operator" },
    ],
  },
  {
    id: "incident-clearance",
    title: "Incident / Accident Clearance Statement",
    date: "24 May 2020",
    dotColor: "bg-emerald-500",
    description: "Certification that the engine and all installed parts have no incident or accident history during the period from manufacture to removal.",
    documents: 1,
    status: "verified" as const,
    statusLabel: "Verified",
    viewerLink: "/mockup-2/folder/f1/f008/viewer/incident-clearance",
    imagePreview: "/documents/sia-incident-clearance.jpg",
    keyData: [
      { label: "Date", value: "24th May 2020" },
      { label: "Period", value: "Manufacture to 24th May 2020" },
      { label: "Engine Serial Number", value: "963481", highlight: true },
      { label: "Engine Model", value: "CFM56-7B26E", highlight: true },
      { label: "Engine TSN", value: "30562", highlight: true },
      { label: "Engine CSN", value: "16501", highlight: true },
    ],
    parties: [
      { name: "Ahmet ACIKYOL", role: "Powerplant Engineer" },
      { name: "Pegasus Airlines", role: "Operator" },
    ],
  },
  {
    id: "birth-record",
    title: "Engine Data Submittal (Birth Record)",
    date: "14 Feb 2019",
    dotColor: "bg-amber-500",
    description: "Original manufacturing and certification documentation. Part manufactured by CFM International with full material traceability.",
    documents: 1,
    status: "pending" as const,
    statusLabel: "Pending Review",
    viewerLink: null,
    imagePreview: null,
    keyData: [
      { label: "Nomenclature", value: "LPT STAGE 4 DISK" },
      { label: "Part Number", value: "340-301-301-0", highlight: true },
      { label: "Serial Number", value: "PA877995", highlight: true },
      { label: "Manufacturer", value: "CFM International" },
      { label: "Manufacturing Date", value: "14 Feb 2019" },
      { label: "Manufacturing Location", value: "France" },
    ],
    parties: [
      { name: "CFM International", role: "Manufacturer" },
    ],
  },
]

// Cross-check variables
const crossCheckVariables = [
  { label: "LLP Part Number", value: "340-301-301-0", status: "match" as const, sources: ["Birth Record", "LLP Status", "ARC", "ON/OFF Log"] },
  { label: "LLP Serial Number", value: "PA877995", status: "match" as const, sources: ["Birth Record", "LLP Status", "ARC", "ON/OFF Log"] },
  { label: "Engine Serial Number", value: "963481", status: "warning" as const, sources: ["LLP Status (963481)", "ARC (962858)"] },
  { label: "LLP TSN", value: "30562", status: "match" as const, sources: ["LLP Status", "ARC", "ON/OFF Log"] },
  { label: "LLP CSN", value: "16501", status: "match" as const, sources: ["LLP Status", "ARC", "ON/OFF Log"] },
]

function CrossCheckStatus({ status }: { status: "match" | "warning" | "missing" }) {
  if (status === "match") {
    return <CheckCircle2 className="h-4 w-4 text-emerald-600" />
  } else if (status === "warning") {
    return <AlertTriangle className="h-4 w-4 text-amber-600" />
  }
  return <AlertTriangle className="h-4 w-4 text-red-600" />
}

export default function F1EngineRecordsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string>("operational-history")
  
  const selectedEventData = timelineEvents.find(e => e.id === selectedEvent)
  
  const matchCount = crossCheckVariables.filter((v) => v.status === "match").length
  const warningCount = crossCheckVariables.filter((v) => v.status === "warning").length

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 border-b bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/mockup-2/folder/f1">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Engine Records
                </Button>
              </Link>
              <div className="text-sm text-slate-500">
                IATA Binder / F1. Engine Records 1 / F 001. Back-to-Birth Documentation
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
                <Download className="h-4 w-4 mr-2" />
                Export BTB Package
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
              <p className="text-slate-600 mt-1">LLP Traceability Timeline</p>
            </div>
            <div className="flex items-center gap-4">
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
          
          {/* Progress Bars */}
          <div className="mt-4 grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Regulatory Status</span>
                <span className="text-sm font-semibold text-emerald-600">100%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Commercial (BTB)</span>
                <span className="text-sm font-semibold text-cyan-600">85%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Timeline & Detail Panel */}
        <div className="flex h-[calc(100vh-220px)]">
          {/* Left: Timeline */}
          <div className="w-[480px] border-r bg-white overflow-y-auto">
            <div className="p-4">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="relative">
                  {/* Connector Line */}
                  {index < timelineEvents.length - 1 && (
                    <div className="absolute left-[11px] top-[28px] w-0.5 h-[calc(100%-8px)] bg-slate-200" />
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
                      <div className={`relative z-10 w-6 h-6 rounded-full ${event.dotColor} flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        selectedEvent === event.id ? "ring-4 ring-offset-2" : ""
                      }`} style={{ 
                        ringColor: selectedEvent === event.id ? `${event.dotColor.replace('bg-', 'rgb(var(--')})` : undefined 
                      }}>
                        {event.status === "flagged" ? (
                          <AlertTriangle className="h-3 w-3 text-white" />
                        ) : event.status === "pending" ? (
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
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-slate-900">{event.title.split(" – ")[0].split(" (")[0]}</span>
                          <Badge className={`text-[10px] px-1.5 py-0 ${
                            event.status === "verified" 
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                              : event.status === "flagged"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-amber-100 text-amber-700 border-amber-200"
                          }`}>
                            {event.statusLabel}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 mb-1">{event.date}</p>
                        <p className="text-sm text-slate-600 line-clamp-2">{event.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                          <FileText className="h-3 w-3" />
                          <span>{event.documents} document</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detail Panel */}
          <div className="flex-1 bg-slate-50 overflow-y-auto">
            {selectedEventData && (
              <div className="p-6">
                {/* Detail Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-slate-900">{selectedEventData.title}</h2>
                      <Badge className={`${
                        selectedEventData.status === "verified" 
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                          : selectedEventData.status === "flagged"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                      }`}>
                        {selectedEventData.statusLabel}
                      </Badge>
                    </div>
                    <p className="text-slate-600">{selectedEventData.description}</p>
                  </div>
                  {selectedEventData.viewerLink && (
                    <Link href={selectedEventData.viewerLink}>
                      <Button className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Document
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Date & Duration */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Date</p>
                      <p className="font-semibold text-slate-900">{selectedEventData.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500">Status</p>
                      <p className={`font-semibold ${
                        selectedEventData.status === "verified" 
                          ? "text-emerald-600" 
                          : selectedEventData.status === "flagged"
                            ? "text-red-600"
                            : "text-amber-600"
                      }`}>
                        {selectedEventData.statusLabel}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Parties Involved */}
                {selectedEventData.parties && selectedEventData.parties.length > 0 && (
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-slate-500" />
                        <h3 className="font-semibold text-slate-700">Parties Involved</h3>
                      </div>
                      <div className="space-y-3">
                        {selectedEventData.parties.map((party, idx) => (
                          <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                            <span className="font-medium text-slate-900">{party.name}</span>
                            <span className="text-sm text-slate-500">{party.role}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Key Data Summary */}
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-700 mb-3">Key Data Summary</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedEventData.keyData.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between items-center p-3 rounded-lg ${
                            item.status === "discrepancy"
                              ? "bg-amber-50 border border-amber-200"
                              : item.status === "success"
                                ? "bg-emerald-50 border border-emerald-200"
                                : item.highlight
                                  ? "bg-cyan-50 border border-cyan-100"
                                  : "bg-slate-50"
                          }`}
                        >
                          <span className={`text-sm ${
                            item.status === "discrepancy"
                              ? "text-amber-800 font-medium"
                              : item.status === "success"
                                ? "text-emerald-800 font-medium"
                                : item.highlight
                                  ? "text-slate-700 font-medium"
                                  : "text-slate-500"
                          }`}>
                            {item.status === "discrepancy" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold cursor-help mr-2">!</span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-amber-600 text-white">
                                  Numbers don&apos;t match
                                </TooltipContent>
                              </Tooltip>
                            )}
                            {item.label}
                          </span>
                          <span className={`text-sm font-mono ${
                            item.status === "discrepancy"
                              ? "font-semibold text-amber-700"
                              : item.status === "success"
                                ? "font-semibold text-emerald-700"
                                : item.highlight
                                  ? "font-semibold text-cyan-700"
                                  : "text-slate-900"
                          }`}>
                            {item.value}
                          </span>
                        </div>
                      ))}
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
                          <Link href={selectedEventData.viewerLink}>
                            <Button size="sm" variant="outline" className="gap-1">
                              <ExternalLink className="h-3 w-3" />
                              Open Full View
                            </Button>
                          </Link>
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
            )}
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
    </TooltipProvider>
  )
}
