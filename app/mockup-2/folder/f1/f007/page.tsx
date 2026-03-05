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

// Engine info
const engineInfo = {
  serialNumber: "963481",
  model: "CFM56-7B26E",
  tsn: "30,562",
  csn: "16501",
  statusDate: "2nd Feb 2022",
}

// LLP data for the engine
const llpData = [
  {
    id: 1,
    item: 1,
    description: "LPT STAGE 2 DISK",
    partNumber: "340-301-301-0",
    serialNumber: "PA877995",
    tsn: "30,562",
    cycleTotal: "16501",
    cycleLimit: "25000",
    cycleRemaining: "8499",
    status: "Completed",
    aiFindings: "No",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 2,
    item: 2,
    description: "LPT STAGE 1 DISK",
    partNumber: "340-301-001-0",
    serialNumber: "PA871600",
    tsn: "30562",
    cycleTotal: "16501",
    cycleLimit: "25000",
    cycleRemaining: "8499",
    status: "Completed",
    aiFindings: "No",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 3,
    item: 3,
    description: "LPT STAGE 3 DISK",
    partNumber: "340-301-201-0",
    serialNumber: "PA822233",
    tsn: "30562",
    cycleTotal: "16501",
    cycleLimit: "25000",
    cycleRemaining: "8499",
    status: "Completed",
    aiFindings: "No",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 4,
    item: 4,
    description: "LPT STAGE 4 DISK",
    partNumber: "340-301-301-0",
    serialNumber: "PA877995",
    tsn: "30,562",
    cycleTotal: "16501",
    cycleLimit: "25000",
    cycleRemaining: "8499",
    status: "Completed",
    aiFindings: "No",
    link: "/mockup-2/folder/f1/f008",
  },
  {
    id: 5,
    item: 5,
    description: "LPT ROTOR SUPPORT",
    partNumber: "340-301-702-0",
    serialNumber: "DF917217",
    tsn: "30562",
    cycleTotal: "16501",
    cycleLimit: "25000",
    cycleRemaining: "8499",
    status: "Completed",
    aiFindings: "No",
    link: "/mockup-2/folder/f1/f008",
  },
]

export default function FolderF1F007Page() {
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
    name: "Engine Records 1",
    progress: 100,
    status: "complete" as const,
    documents: 32,
  }

  const filteredLLPs = llpData.filter(
    (llp) =>
      llp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      llp.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      llp.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const completedCount = llpData.filter((l) => getEffectiveStatus(l) === "Completed").length
  const inProgressCount = llpData.filter((l) => getEffectiveStatus(l) === "In Progress").length
  const notStartedCount = llpData.filter((l) => getEffectiveStatus(l) === "Not Started").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100">In Progress</Badge>
      case "Not Started":
        return <Badge className="bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-100">Not Started</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getAiFindingsBadge = (aiFindings: string) => {
    if (aiFindings === "Yes") {
      return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Yes</Badge>
    }
    return <Badge className="bg-slate-100 text-slate-500 border-slate-200">No</Badge>
  }

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            <Link href="/mockup-2/folder/f1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Engine Records 1
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
              <Progress value={98} className="h-2" />
            </div>
            <span className="text-sm font-semibold text-slate-900">98%</span>
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
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <span className="text-sm text-slate-600">Not Started</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-600">{notStartedCount}</span>
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
                  <Link href="/mockup-2/folder/f1" className="hover:text-slate-900 transition-colors">
                    {folderInfo.letter}. {folderInfo.name}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="font-semibold text-slate-900">
                    F 007. Life Limited Parts
                  </span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Engine Life Limited Parts List</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search by serial number, part number, or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-80 bg-white border-slate-200"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Search className="h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </div>

                {/* Engine Info Header */}
                <div className="border border-slate-200 rounded-lg mb-4 overflow-hidden">
                  <div className="grid grid-cols-6 gap-px bg-slate-200">
                    <div className="bg-slate-50 px-4 py-2">
                      <p className="text-xs text-slate-500">Engine Serial Number</p>
                      <p className="font-semibold text-slate-900">{engineInfo.serialNumber}</p>
                    </div>
                    <div className="bg-slate-50 px-4 py-2">
                      <p className="text-xs text-slate-500">Engine Model</p>
                      <p className="font-semibold text-slate-900">{engineInfo.model}</p>
                    </div>
                    <div className="bg-slate-50 px-4 py-2">
                      <p className="text-xs text-slate-500">Engine TSN</p>
                      <p className="font-semibold text-slate-900">{engineInfo.tsn}</p>
                    </div>
                    <div className="bg-slate-50 px-4 py-2">
                      <p className="text-xs text-slate-500">Engine CSN</p>
                      <p className="font-semibold text-slate-900">{engineInfo.csn}</p>
                    </div>
                    <div className="bg-slate-50 px-4 py-2">
                      <p className="text-xs text-slate-500">Status Date</p>
                      <p className="font-semibold text-slate-900">{engineInfo.statusDate}</p>
                    </div>
                    <div className="bg-white px-4 py-2"></div>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          P/N
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          S/N
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          TSN
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Cycle Total
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Cycle Limit
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Cycle Remaining
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          AI Findings
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLLPs.map((llp) => {
                        const effectiveStatus = getEffectiveStatus(llp)
                        
                        return (
                          <tr
                            key={llp.id}
                            className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm font-medium text-slate-900">{llp.item}</span>
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm font-medium text-slate-700">{llp.description}</span>
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm font-mono text-slate-600">{llp.partNumber}</span>
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm font-mono text-slate-600">{llp.serialNumber}</span>
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm text-slate-600">{llp.tsn}</span>
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm text-slate-600">{llp.cycleTotal}</span>
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm text-slate-600">{llp.cycleLimit}</span>
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                <span className="text-sm text-slate-600">{llp.cycleRemaining}</span>
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                {getStatusBadge(effectiveStatus)}
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={llp.link} className="block">
                                {getAiFindingsBadge(llp.aiFindings)}
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
                    <p className="text-xs text-slate-500">Description</p>
                    <p className="font-semibold text-slate-900">{reviewDialog.llp.description}</p>
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
                Verify that all documentation for <span className="font-semibold">{reviewDialog.llp.description}</span> is complete and accurate before marking as verified.
              </p>
            </div>
          )}

          <DialogFooter className="flex gap-2">
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
                {pdfDialog.llp.description} - {pdfDialog.llp.partNumber}
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
                    <p className="text-xs text-slate-500">Description</p>
                    <p className="font-semibold text-slate-900">{pdfDialog.llp.description}</p>
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

          <DialogFooter className="flex gap-2">
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
