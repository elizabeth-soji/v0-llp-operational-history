"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ChevronRight,
  LayoutGrid,
  Sparkles,
  FolderOpen,
  BookOpen,
  BarChart3,
  FileText,
  Brain,
  ArrowLeft,
  MoreVertical,
  Pencil,
  XCircle,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

// Line items data (same as parent page)
const lineItemsData: Record<string, {
  id: number
  chapter: string
  chapterFull: string
  item: string
  taskNo: string
  title: string
  mroReference: string
  status: string
  aiFindings: string
  references: string
  applicableDocumentation: string
}> = {
  "05": {
    id: 5,
    chapter: "1 - Service Bulletins (SB), All Operator...",
    chapterFull: "1 - Service Bulletins (SB), All Operator Telex (AOT) & Airworthiness Directives (AD)",
    item: "05",
    taskNo: "A330-31-3227",
    title: "INDICATING/RECORDING SYSTEMS - GENERAL - ELECTRONIC INSTRUMENT SYSTEM (EIS) - INSTALL EIS2 STANDARD L10",
    mroReference: "200075728",
    status: "Awaiting",
    aiFindings: "Pending",
    references: "No references",
    applicableDocumentation: "No applicable documentation",
  },
  "06": {
    id: 6,
    chapter: "1 - Service Bulletins (SB), All Operator...",
    chapterFull: "1 - Service Bulletins (SB), All Operator Telex (AOT) & Airworthiness Directives (AD)",
    item: "06",
    taskNo: "A330-53-3261",
    title: "FLIGHT CONTROLS - ELECTRICAL BACK-UP - INSTALL NEW BACK-UP CONTROL",
    mroReference: "2000775729",
    status: "Awaiting",
    aiFindings: "Pending",
    references: "No references",
    applicableDocumentation: "No applicable documentation",
  },
  "08": {
    id: 8,
    chapter: "1 - Service Bulletins (SB), All Operator...",
    chapterFull: "1 - Service Bulletins (SB), All Operator Telex (AOT) & Airworthiness Directives (AD)",
    item: "08",
    taskNo: "2007-0201",
    title: "LANDING GEAR - NOSE LANDING GEAR (NLG) RETRACTION ACTUATOR - OVERHAUL",
    mroReference: "2000775867",
    status: "Awaiting",
    aiFindings: "Pending",
    references: "No references",
    applicableDocumentation: "No applicable documentation",
  },
  "09": {
    id: 9,
    chapter: "1 - Service Bulletins (SB), All Operator...",
    chapterFull: "1 - Service Bulletins (SB), All Operator Telex (AOT) & Airworthiness Directives (AD)",
    item: "09",
    taskNo: "2012-0034",
    title: "FUSELAGE - TRIMMABLE HORIZONTAL STABILIZER SUPPORT STRUTS - INSPECTION / REPLACEMENT",
    mroReference: "2000775769",
    status: "Awaiting",
    aiFindings: "Pending",
    references: "No references",
    applicableDocumentation: "No applicable documentation",
  },
  "10": {
    id: 10,
    chapter: "1 - Service Bulletins (SB), All Operator...",
    chapterFull: "1 - Service Bulletins (SB), All Operator Telex (AOT) & Airworthiness Directives (AD)",
    item: "10",
    taskNo: "2014-0068",
    title: "DOORS - FORWARD AND AFT CARGO DOORS - INSPECTION / REINFORCEMENT",
    mroReference: "2000777628",
    status: "Awaiting",
    aiFindings: "Pending",
    references: "No references",
    applicableDocumentation: "No applicable documentation",
  },
}

export default function LineItemDetailPage() {
  const params = useParams()
  const itemId = params.itemId as string
  const lineItem = lineItemsData[itemId] || lineItemsData["05"]
  
  const [selectedCheck, setSelectedCheck] = useState<"general" | "jobCards">("general")
  const [mroVerified, setMroVerified] = useState(false)
  const [showMroModal, setShowMroModal] = useState(false)
  const [dfpReferences, setDfpReferences] = useState<string[]>([lineItem.mroReference])
  const [nrcReferences, setNrcReferences] = useState<string[]>(["611"])
  
  // First awaiting item (05) has handwritten MRO reference warning
  const hasHandwrittenWarning = itemId === "05" && !mroVerified

  const complianceChecks = [
    { id: "general", label: "General", status: "Failed" },
    { id: "jobCards", label: "Job Cards", status: "Awaiting" },
  ]

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "failed":
        return "bg-red-50 text-red-600 border-red-200"
      case "awaiting":
        return "bg-amber-50 text-amber-600 border-amber-200"
      case "passed":
        return "bg-emerald-50 text-emerald-600 border-emerald-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-slate-200">
          <Link href="/mockup-2" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">SOJI</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <div className="space-y-1">
            <Link
              href="/mockup-2"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              <LayoutGrid className="h-4 w-4" />
              Ticket Explorer
            </Link>
            <Link
              href="/mockup-2"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              <Sparkles className="h-4 w-4" />
              End of Lease Projects
            </Link>
            <Link
              href="/mockup-2"
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg"
            >
              <FolderOpen className="h-4 w-4" />
              Maintenance Review
            </Link>
            <Link
              href="/mockup-2"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              <BookOpen className="h-4 w-4" />
              IATA Binder
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 space-y-1">
            <Link
              href="/mockup-2"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              <BarChart3 className="h-4 w-4" />
              Statistics
            </Link>
            <Link
              href="/mockup-2"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              <FileText className="h-4 w-4" />
              Document Repository
            </Link>
            <Link
              href="/mockup-2"
              className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-slate-50"
            >
              <Brain className="h-4 w-4" />
              Domain Knowledge
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Breadcrumb */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/mockup-2/folder/c/subfolder/c007" className="hover:text-slate-700">
              Line Items
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">{lineItem.item}</span>
          </div>
        </div>

        {/* Header */}
        <div className="px-6 py-6 bg-white border-b border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-900 leading-tight max-w-4xl">
                {lineItem.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 ml-6">
              <Link href="/mockup-2/folder/c/subfolder/c007">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back To Work Order
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="mt-6 grid grid-cols-3 gap-x-12 gap-y-4">
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Chapter</div>
              <div className="text-sm text-slate-600 leading-relaxed">{lineItem.chapterFull}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Item No.</div>
              <div className="text-sm text-slate-600">{lineItem.item}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Status</div>
              <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${getStatusBadgeClass(lineItem.status)}`}>
                {lineItem.status}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-x-12 gap-y-4">
            <div>
              <div className={`text-sm font-medium mb-1 ${hasHandwrittenWarning ? "text-amber-600" : "text-slate-900"}`}>
                MRO References
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${hasHandwrittenWarning ? "text-amber-600" : "text-slate-600"}`}>
                  {lineItem.mroReference}
                </span>
                {itemId === "05" && (
                  hasHandwrittenWarning ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            onClick={() => setShowMroModal(true)}
                            className="text-amber-500 hover:text-amber-600"
                          >
                            <AlertTriangle className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>The MRO reference was found handwritten and should be verified</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-emerald-500">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                              <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>MRO reference has been verified</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                )}
                <button 
                  onClick={() => setShowMroModal(true)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <Pencil className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Task No.</div>
              <div className="text-sm text-slate-600">{lineItem.taskNo}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">References</div>
              <div className="text-sm text-slate-500">{lineItem.references}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Applicable Documentation</div>
              <div className="text-sm text-slate-500">{lineItem.applicableDocumentation}</div>
            </div>
          </div>
        </div>

        {/* Compliance Checks Section */}
        <div className="flex-1 p-6">
          <div className="flex gap-6">
            {/* Left Panel - Compliance Checks List */}
            <div className="w-80 bg-white rounded-lg border border-slate-200 p-5">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Compliance Checks</h2>
              <div className="space-y-2">
                {complianceChecks.map((check) => (
                  <button
                    key={check.id}
                    onClick={() => setSelectedCheck(check.id as "general" | "jobCards")}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors ${
                      selectedCheck === check.id
                        ? "border-slate-300 bg-slate-50"
                        : "border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-700">{check.label}</span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getStatusBadgeClass(check.status)}`}>
                      {check.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Panel - Check Details */}
            <div className="flex-1 bg-white rounded-lg border border-slate-200 p-5">
              {selectedCheck === "general" ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-base font-semibold text-slate-900">General</h2>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getStatusBadgeClass("Failed")}`}>
                      Failed
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">
                    Automated checks for this line item in the selected document type
                  </p>

                  {/* Error Card */}
                  <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-slate-900">Line Item has Related Task Card</div>
                        <div className="text-sm text-slate-600 mt-0.5">
                          The Line Item is not associated with a Task Card.
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-base font-semibold text-slate-900">Job Cards</h2>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getStatusBadgeClass("Awaiting")}`}>
                      Awaiting
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4">
                    Job card compliance checks for this line item
                  </p>

                  {/* Awaiting Card */}
                  <div className="border-l-4 border-amber-500 bg-amber-50 rounded-r-lg p-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-slate-900">Awaiting Job Card Review</div>
                        <div className="text-sm text-slate-600 mt-0.5">
                          Job card compliance check is pending review.
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MRO References Modal */}
      <Dialog open={showMroModal} onOpenChange={setShowMroModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">Edit MRO References</DialogTitle>
            <DialogDescription className="text-slate-500">
              Update MRO DFP and NRC references for this line item.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 space-y-6">
            {/* MRO DFP References */}
            <div>
              <label className="text-sm font-semibold text-slate-900 block mb-3">MRO DFP References</label>
              {dfpReferences.map((ref, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={ref}
                    onChange={(e) => {
                      const newRefs = [...dfpReferences]
                      newRefs[index] = e.target.value
                      setDfpReferences(newRefs)
                    }}
                    placeholder="Enter reference"
                    className="flex-1 text-slate-900"
                  />
                  <button 
                    onClick={() => {
                      const newRefs = dfpReferences.filter((_, i) => i !== index)
                      setDfpReferences(newRefs.length ? newRefs : [""])
                    }}
                    className="p-2 text-slate-400 hover:text-slate-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setDfpReferences([...dfpReferences, ""])}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 mt-2"
              >
                <Plus className="h-4 w-4" />
                Add Reference
              </button>
            </div>

            {/* MRO NRC References */}
            <div>
              <label className="text-sm font-semibold text-slate-900 block mb-3">MRO NRC References</label>
              {nrcReferences.map((ref, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={ref}
                    onChange={(e) => {
                      const newRefs = [...nrcReferences]
                      newRefs[index] = e.target.value
                      setNrcReferences(newRefs)
                    }}
                    placeholder="Enter reference"
                    className="flex-1"
                  />
                  <button 
                    onClick={() => {
                      const newRefs = nrcReferences.filter((_, i) => i !== index)
                      setNrcReferences(newRefs.length ? newRefs : [""])
                    }}
                    className="p-2 text-slate-400 hover:text-slate-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setNrcReferences([...nrcReferences, ""])}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 mt-2"
              >
                <Plus className="h-4 w-4" />
                Add Reference
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={() => setShowMroModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setMroVerified(true)
                setShowMroModal(false)
              }}
              className="bg-[#7C9A92] hover:bg-[#6B8A82] text-white"
            >
              Verify and resolve
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
