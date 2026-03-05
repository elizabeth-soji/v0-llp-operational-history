"use client"

import Link from "next/link"
import { ArrowLeft, Download, Clock, Upload, ChevronRight, Folder, Search, FileText, CheckCircle2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// LLP data for the engine
const llpData = [
  {
    id: 1,
    itemNumber: "F008-001",
    nomenclature: "DISK, LPT STG 4",
    partNumber: "340-301-301-0",
    serialNumber: "PA877995",
    position: "LPT4",
    assignee: "Sarah C.",
    party: "MRO",
    status: "In Progress",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 2,
    itemNumber: "F008-002",
    nomenclature: "DISK, LPT STG 3",
    partNumber: "340-301-201-0",
    serialNumber: "PA854221",
    position: "LPT3",
    assignee: "Sarah C.",
    party: "MRO",
    status: "Completed",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 3,
    itemNumber: "F008-003",
    nomenclature: "DISK, LPT STG 2",
    partNumber: "340-301-101-0",
    serialNumber: "PA812456",
    position: "LPT2",
    assignee: "John D.",
    party: "CAMO",
    status: "Pending",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 4,
    itemNumber: "F008-004",
    nomenclature: "DISK, LPT STG 1",
    partNumber: "340-300-401-0",
    serialNumber: "PA798123",
    position: "LPT1",
    assignee: "John D.",
    party: "CAMO",
    status: "Completed",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 5,
    itemNumber: "F008-005",
    nomenclature: "DISK, HPT STG 2",
    partNumber: "335-201-301-0",
    serialNumber: "HP445621",
    position: "HPT2",
    assignee: "Mike T.",
    party: "MRO",
    status: "In Progress",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 6,
    itemNumber: "F008-006",
    nomenclature: "DISK, HPT STG 1",
    partNumber: "335-201-201-0",
    serialNumber: "HP412897",
    position: "HPT1",
    assignee: "Mike T.",
    party: "MRO",
    status: "Completed",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 7,
    itemNumber: "F008-007",
    nomenclature: "DISK, HPC STG 9",
    partNumber: "330-109-301-0",
    serialNumber: "HC998754",
    position: "HPC9",
    assignee: "Sarah C.",
    party: "MRO",
    status: "In Progress",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 8,
    itemNumber: "F008-008",
    nomenclature: "SHAFT, HPT",
    partNumber: "335-401-101-0",
    serialNumber: "SH224561",
    position: "HPT",
    assignee: "John D.",
    party: "CAMO",
    status: "Pending",
    link: "/mockup-2/folder/f1/f008",
  },
]

export default function FolderF1Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [llpStatuses, setLlpStatuses] = useState<Record<number, string>>({})
  const [reviewDialog, setReviewDialog] = useState<{
    open: boolean
    llp: typeof llpData[0] | null
  }>({ open: false, llp: null })
  const [pdfDialog, setPdfDialog] = useState<{
    open: boolean
    llp: typeof llpData[0] | null
  }>({ open: false, llp: null })

  // Get the effective status (from state or original data)
  const getEffectiveStatus = (llp: typeof llpData[0]) => {
    return llpStatuses[llp.id] || llp.status
  }

  // Handle marking as verified
  const handleMarkAsVerified = () => {
    if (reviewDialog.llp) {
      setLlpStatuses(prev => ({
        ...prev,
        [reviewDialog.llp!.id]: "Completed"
      }))
      setReviewDialog({ open: false, llp: null })
    }
  }

  // Open review dialog
  const openReviewDialog = (llp: typeof llpData[0], e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setReviewDialog({ open: true, llp })
  }

  // Open PDF preview dialog
  const openPdfDialog = (llp: typeof llpData[0], e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPdfDialog({ open: true, llp })
  }

  const folderInfo = {
    letter: "F1",
    name: "Engine Records 2",
    progress: 65,
    status: "in-progress",
    documents: 32,
  }

  const filteredLLPs = llpData.filter(
    (llp) =>
      llp.nomenclature.toLowerCase().includes(searchQuery.toLowerCase()) ||
      llp.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      llp.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      llp.itemNumber.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const completedCount = llpData.filter((l) => getEffectiveStatus(l) === "Completed").length
  const inProgressCount = llpData.filter((l) => getEffectiveStatus(l) === "In Progress").length
  const pendingCount = llpData.filter((l) => getEffectiveStatus(l) === "Pending").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100">In Progress</Badge>
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPartyBadge = (party: string) => {
    switch (party) {
      case "MRO":
        return <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">MRO</span>
      case "CAMO":
        return <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded">CAMO</span>
      default:
        return <span className="text-xs font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded">{party}</span>
    }
  }

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            <Link href="/mockup-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Binder
            </Link>
          </Button>
          <div className="h-6 w-px bg-slate-200" />
          <h1 className="text-xl font-bold text-slate-900">EFW A321-200 P2F Redelivery</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
          >
            <Folder className="h-4 w-4 mr-2" />
            AI Record Management System
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </Button>
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Binder
          </Button>
        </div>
      </div>

      {/* Project Info Bar */}
      <div className="border-b border-slate-200 bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-xs text-slate-500">MSN:</span>
              <span className="font-mono font-semibold text-slate-900 ml-1">7382</span>
            </div>
            <div>
              <span className="text-xs text-slate-500">Registry:</span>
              <span className="font-mono font-semibold text-slate-900 ml-1">JA112A</span>
            </div>
            <div>
              <span className="text-xs text-slate-500">Delivery:</span>
              <span className="font-semibold text-slate-900 ml-1">25/11/2025</span>
            </div>
            <span className="font-semibold text-amber-600 flex items-center gap-1">
              T-31 days
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Overall Progress:</span>
            <div className="w-48">
              <Progress value={68} className="h-2" />
            </div>
            <span className="text-sm font-semibold text-slate-900">68%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Progress Dashboard */}
          <div className="w-64 flex-shrink-0">
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Progress Dashboard</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-sm text-slate-600">Completed</span>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600">{completedCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-sky-500" />
                      <span className="text-sm text-slate-600">In Progress</span>
                    </div>
                    <span className="text-sm font-semibold text-sky-600">{inProgressCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-sm text-slate-600">Pending</span>
                    </div>
                    <span className="text-sm font-semibold text-amber-600">{pendingCount}</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="text-sm text-slate-600">Total</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{llpData.length}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">
                      {Math.round((completedCount / llpData.length) * 100)}%
                    </div>
                    <div className="text-sm text-slate-500">Completion</div>
                    <div className="mt-3">
                      <Progress value={(completedCount / llpData.length) * 100} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - LLP Table */}
          <div className="flex-1">
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                  <Link href="/mockup-2" className="hover:text-slate-900 transition-colors">
                    IATA Binder
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-semibold text-slate-900">
                    {folderInfo.letter}. {folderInfo.name}
                  </span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Life Limited Parts (LLPs)</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search by serial number, part number, or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-96 bg-white border-slate-200"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Search className="h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Item #
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Nomenclature
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Part Number
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Serial Number
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Assignee
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLLPs.map((llp) => {
                        const effectiveStatus = getEffectiveStatus(llp)
                        const isPending = effectiveStatus === "Pending"
                        
                        return (
                          <tr
                            key={llp.id}
                            className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <td className="py-4 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm font-medium text-slate-900">{llp.itemNumber}</span>
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm text-slate-700">{llp.nomenclature}</span>
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm font-mono text-slate-600">{llp.partNumber}</span>
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm font-mono text-slate-600">{llp.serialNumber}</span>
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm text-slate-600">{llp.position}</span>
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <Link href={llp.link} className="block">
                                <div className="flex items-center gap-2">
                                  {getPartyBadge(llp.party)}
                                </div>
                              </Link>
                            </td>
                            <td className="py-4 px-4">
                              <Link href={llp.link} className="block">
                                {getStatusBadge(effectiveStatus)}
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredLLPs.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    No LLPs found matching your search.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialog.open} onOpenChange={(open) => !open && setReviewDialog({ open: false, llp: null })}>
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
          
          {reviewDialog.llp && (
            <div className="py-4">
              {/* Part Information */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Part Number</p>
                    <p className="font-mono font-semibold text-slate-900">{reviewDialog.llp.partNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Serial Number</p>
                    <p className="font-mono font-semibold text-slate-900">{reviewDialog.llp.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Nomenclature</p>
                    <p className="font-semibold text-slate-900">{reviewDialog.llp.nomenclature}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Position</p>
                    <p className="font-semibold text-slate-900">{reviewDialog.llp.position}</p>
                  </div>
                </div>
              </div>

              {/* Document Preview */}
              <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Document Preview</span>
                  <Link href={reviewDialog.llp.link}>
                    <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
                      <Eye className="h-4 w-4" />
                      View Full Timeline
                    </Button>
                  </Link>
                </div>
                <div className="bg-white p-4 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-40 mx-auto bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center mb-3">
                      <FileText className="h-12 w-12 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-600">Birth Record Document</p>
                    <p className="text-xs text-slate-400 mt-1">Engine Data Submittal</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Verify that all documentation for <span className="font-semibold">{reviewDialog.llp.nomenclature}</span> is complete and accurate before marking as verified.
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setReviewDialog({ open: false, llp: null })}>
              Cancel
            </Button>
            <Button onClick={handleMarkAsVerified} className="bg-emerald-600 hover:bg-emerald-700">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark as Verified
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Dialog */}
      <Dialog open={pdfDialog.open} onOpenChange={(open) => !open && setPdfDialog({ open: false, llp: null })}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-500" />
              Document Preview
            </DialogTitle>
            {pdfDialog.llp && (
              <DialogDescription>
                {pdfDialog.llp.nomenclature} - {pdfDialog.llp.partNumber}
              </DialogDescription>
            )}
          </DialogHeader>
          
          {pdfDialog.llp && (
            <div className="py-2">
              {/* Part Information Header */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Part Number</p>
                    <p className="font-mono font-semibold text-slate-900">{pdfDialog.llp.partNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Serial Number</p>
                    <p className="font-mono font-semibold text-slate-900">{pdfDialog.llp.serialNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Position</p>
                    <p className="font-semibold text-slate-900">{pdfDialog.llp.position}</p>
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
                  <span className="text-sm font-medium text-slate-300">Birth Record - Engine Data Submittal.pdf</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-[50vh] flex items-center justify-center bg-slate-100">
                  <div className="text-center p-8">
                    <div className="w-48 h-64 mx-auto bg-white rounded-lg shadow-lg border border-slate-200 flex flex-col items-center justify-center mb-4">
                      <FileText className="h-16 w-16 text-slate-300 mb-4" />
                      <div className="w-32 h-2 bg-slate-200 rounded mb-2"></div>
                      <div className="w-24 h-2 bg-slate-200 rounded mb-2"></div>
                      <div className="w-28 h-2 bg-slate-200 rounded mb-4"></div>
                      <div className="w-20 h-2 bg-slate-200 rounded"></div>
                    </div>
                    <p className="text-sm text-slate-600">Engine Data Submittal</p>
                    <p className="text-xs text-slate-400 mt-1">CFM International - Birth Record</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Link href={pdfDialog.llp?.link || "#"}>
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                View Full Timeline
              </Button>
            </Link>
            <Button onClick={() => setPdfDialog({ open: false, llp: null })}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
