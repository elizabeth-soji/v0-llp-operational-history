"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  ChevronLeft, 
  ChevronRight,
  MoreVertical, 
  FileText, 
  Search, 
  ChevronDown,
  AlertCircle,
  Pencil
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function C007ServiceBulletinPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"line-items" | "removal">("line-items")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedAIFindings, setSelectedAIFindings] = useState<string[]>([])

  const itemsPerPage = 10
  const totalItems = 686
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Work Order Info
  const workOrderInfo = {
    workOrderNo: "1071 Conversion",
    woName: "Engineering Orders & Vendor Service Bulletin",
    aircraft: "A330-343 - F-WTAN",
    maintenanceOrg: "ELBE FLUGZEUGWERKE GmbH.",
    applicableDoc: "Not specified",
    woRevision: "12",
    woDate: "2024-08-26",
    woCompletionDate: "2026-05-21",
  }

  // Stats
  const stats = {
    jobCards: { total: 0, aiFindings: 0 },
    nonRoutineJobCards: { total: 0, aiFindings: 0 },
    components: { total: 0, aiFindings: 0 },
  }

  // Line Items Data
  const lineItems = [
    {
      id: 1,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "01",
      taskNo: "A330-31-3279",
      title: "INDICATING/RECORDING SYSTEMS - FLIGHT WARNING COMPUTER (FWC) - INSTALL T9-3",
      mroReference: "N/A",
      status: "Cancelled",
      aiFindings: "Pending",
    },
    {
      id: 2,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "02",
      taskNo: "A330-31-3163",
      title: "INDICATING/RECORDING SYSTEMS - GENERAL",
      mroReference: "N/A",
      status: "Cancelled",
      aiFindings: "Pending",
    },
    {
      id: 3,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "03",
      taskNo: "A330-31-3169",
      title: "INDICATING/RECORDING SYSTEMS - SYSTEM DATA ACQUISITION CONCENTRATOR",
      mroReference: "N/A",
      status: "Cancelled",
      aiFindings: "Pending",
    },
    {
      id: 4,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "04",
      taskNo: "A330-31-3222",
      title: "FUSELAGE - MAIN STRUCTURE - INSPECTION OF CARGO PARTS FOLLOWING MATERIAL NON CONFORMITY",
      mroReference: "N/A",
      status: "Cancelled",
      aiFindings: "Pending",
    },
    {
      id: 5,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "05",
      taskNo: "A330-31-3227",
      title: "INDICATING/RECORDING SYSTEMS - GENERAL - ELECTRONIC INSTRUMENT SYSTEM (EIS) - INSTALL EIS2 STANDARD L10",
      mroReference: "200075728",
      status: "Awaiting",
      aiFindings: "Pending",
    },
    {
      id: 6,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "06",
      taskNo: "A330-53-3261",
      title: "FLIGHT CONTROLS - ELECTRICAL BACK-UP - INSTALL NEW BACK-UP CONTROL",
      mroReference: "2000775729",
      status: "Awaiting",
      aiFindings: "Pending",
    },
    {
      id: 7,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "07",
      taskNo: "A330-27-3161",
      title: "Engine - HP/IP Turbine Bearing Oil Vent Tubes - Cleaning / Replacement",
      mroReference: "N/A",
      status: "Cancelled",
      aiFindings: "Pending",
    },
    {
      id: 8,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "08",
      taskNo: "2007-0201",
      title: "LANDING GEAR - NOSE LANDING GEAR (NLG) RETRACTION ACTUATOR - OVERHAUL",
      mroReference: "2000775867",
      status: "Awaiting",
      aiFindings: "Pending",
    },
    {
      id: 9,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "09",
      taskNo: "2012-0034",
      title: "FUSELAGE - TRIMMABLE HORIZONTAL STABILIZER SUPPORT STRUTS - INSPECTION / REPLACEMENT",
      mroReference: "2000775769",
      status: "Awaiting",
      aiFindings: "Pending",
    },
    {
      id: 10,
      chapter: "1 - Service Bulletins (SB), All Operator...",
      item: "10",
      taskNo: "2014-0068",
      title: "DOORS - FORWARD AND AFT CARGO DOORS - INSPECTION / REINFORCEMENT",
      mroReference: "2000777628",
      status: "Awaiting",
      aiFindings: "Pending",
    },
  ]

  const filteredItems = lineItems.filter((item) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      item.chapter.toLowerCase().includes(query) ||
      item.item.toLowerCase().includes(query) ||
      item.taskNo.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.mroReference.toLowerCase().includes(query)

    const matchesChapter = selectedChapters.length === 0 || selectedChapters.some(c => item.chapter.includes(c))
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(item.status)
    const matchesAIFindings = selectedAIFindings.length === 0 || selectedAIFindings.includes(item.aiFindings)

    return matchesSearch && matchesChapter && matchesStatus && matchesAIFindings
  })

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200"
      case "awaiting":
        return "bg-teal-100 text-teal-700 border-teal-200"
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getAIFindingsBadgeClass = (finding: string) => {
    switch (finding.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "resolved":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "flagged":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const chapterOptions = [
    { label: "1 - Service Bulletins (SB)", value: "1 - Service Bulletins" },
    { label: "2 - All Operator Wire", value: "2 - All Operator" },
  ]

  const statusOptions = [
    { label: "Cancelled", value: "Cancelled" },
    { label: "Awaiting", value: "Awaiting" },
    { label: "Completed", value: "Completed" },
  ]

  const aiFindingsOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Resolved", value: "Resolved" },
    { label: "Flagged", value: "Flagged" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar placeholder - matching the design */}
      <div className="fixed left-0 top-0 h-full w-[200px] bg-white border-r border-slate-200 z-40">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-slate-900 flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-slate-900">SOJI</span>
          </div>
        </div>
        <nav className="p-2 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <FileText className="h-4 w-4" />
            Ticket Explorer
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <FileText className="h-4 w-4" />
            End of Lease Projects
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 bg-emerald-50 rounded-lg font-medium">
            <Pencil className="h-4 w-4 text-emerald-600" />
            Maintenance Review
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <FileText className="h-4 w-4" />
            IATA Binder
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-slate-200">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <FileText className="h-4 w-4" />
            Statistics
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <FileText className="h-4 w-4" />
            Document Repository
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <FileText className="h-4 w-4" />
            Domain Knowledge
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[200px]">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200 px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="#" className="hover:text-slate-700">Aircrafts</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="#" className="hover:text-slate-700">ATM Registration 1122</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="#" className="hover:text-slate-700">Work Orders</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900">1071 Conversion</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              1071 Conversion : Engineering Orders & Vendor Service Bulletin
            </h1>
            <div className="flex items-center gap-2">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Complete Work Order
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Work Order Details */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Work Order No.</div>
              <div className="text-sm text-slate-600">{workOrderInfo.workOrderNo}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">WO Name</div>
              <div className="text-sm text-slate-600">{workOrderInfo.woName}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Aircraft</div>
              <div className="text-sm text-slate-600">{workOrderInfo.aircraft}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Maintenance Organisation</div>
              <div className="text-sm text-slate-600">{workOrderInfo.maintenanceOrg}</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-medium text-slate-900 mb-1">Applicable Documentation</div>
            <div className="text-sm text-slate-600">{workOrderInfo.applicableDoc}</div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">WO Revision</div>
              <div className="text-sm text-slate-600">{workOrderInfo.woRevision}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">WO Date</div>
              <div className="text-sm text-slate-600">{workOrderInfo.woDate}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">WO Completion Date</div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                {workOrderInfo.woCompletionDate}
                <Pencil className="h-3 w-3 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">STATS</div>
          <div className="flex gap-4">
            <Card className="flex-1 border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Job Cards</div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-slate-900">{stats.jobCards.total}</span>
                        <span className="text-xs text-slate-500">Total</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-slate-400" />
                        <span className="text-lg font-bold text-slate-900">{stats.jobCards.aiFindings}</span>
                        <span className="text-xs text-slate-500">AI Findings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Non Routine Job Cards</div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-slate-900">{stats.nonRoutineJobCards.total}</span>
                        <span className="text-xs text-slate-500">Total</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-slate-400" />
                        <span className="text-lg font-bold text-slate-900">{stats.nonRoutineJobCards.aiFindings}</span>
                        <span className="text-xs text-slate-500">AI Findings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Components</div>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-slate-900">{stats.components.total}</span>
                        <span className="text-xs text-slate-500">Total</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-slate-400" />
                        <span className="text-lg font-bold text-slate-900">{stats.components.aiFindings}</span>
                        <span className="text-xs text-slate-500">AI Findings</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-slate-200 px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("line-items")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "line-items"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Line Items
              <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-700">
                {totalItems}
              </Badge>
            </button>
            <button
              onClick={() => setActiveTab("removal")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "removal"
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              Removal/Installation
              <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-700">
                0
              </Badge>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search line items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-white border-slate-200">
                    All Chapters
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {chapterOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={selectedChapters.includes(option.value)}
                      onCheckedChange={() => {
                        setSelectedChapters((prev) =>
                          prev.includes(option.value)
                            ? prev.filter((c) => c !== option.value)
                            : [...prev, option.value]
                        )
                      }}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-white border-slate-200">
                    All Status
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {statusOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={selectedStatus.includes(option.value)}
                      onCheckedChange={() => {
                        setSelectedStatus((prev) =>
                          prev.includes(option.value)
                            ? prev.filter((s) => s !== option.value)
                            : [...prev, option.value]
                        )
                      }}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-white border-slate-200">
                    All AI Findings
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {aiFindingsOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={selectedAIFindings.includes(option.value)}
                      onCheckedChange={() => {
                        setSelectedAIFindings((prev) =>
                          prev.includes(option.value)
                            ? prev.filter((f) => f !== option.value)
                            : [...prev, option.value]
                        )
                      }}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Search by: Item No, Task No, Chapter No, Description or MRO references
          </div>
        </div>

        {/* Table */}
        <div className="bg-white px-6 pb-6">
          <div className="text-sm text-slate-600 mb-4">
            Showing 1 to 10 of {totalItems} Line Items
          </div>
          
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left p-3 font-medium text-slate-700">Chapter</th>
                  <th className="text-left p-3 font-medium text-slate-700">Item</th>
                  <th className="text-left p-3 font-medium text-slate-700">Task No.</th>
                  <th className="text-left p-3 font-medium text-slate-700">Title/Description</th>
                  <th className="text-left p-3 font-medium text-slate-700">MRO Reference</th>
                  <th className="text-left p-3 font-medium text-slate-700">Status</th>
                  <th className="text-left p-3 font-medium text-slate-700">AI Findings</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="p-3 text-slate-700 max-w-[180px]">
                      <div className="truncate">{item.chapter}</div>
                    </td>
                    <td className="p-3 text-slate-900 font-medium">{item.item}</td>
                    <td className="p-3 text-slate-700 font-mono text-xs">{item.taskNo}</td>
                    <td className="p-3 text-slate-700 max-w-[300px]">
                      <div className="line-clamp-2">{item.title}</div>
                    </td>
                    <td className="p-3 text-slate-600">{item.mroReference}</td>
                    <td className="p-3">
                      <Badge variant="outline" className={getStatusBadgeClass(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline" className={getAIFindingsBadgeClass(item.aiFindings)}>
                        {item.aiFindings}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 p-0 ${currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                >
                  {page}
                </Button>
              ))}
              <span className="px-2 text-slate-400">...</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                className="h-8 w-8 p-0"
              >
                {totalPages}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Page</span>
              <Input
                type="number"
                value={currentPage}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (val >= 1 && val <= totalPages) setCurrentPage(val)
                }}
                className="w-12 h-8 text-center"
                min={1}
                max={totalPages}
              />
              <span>of {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
