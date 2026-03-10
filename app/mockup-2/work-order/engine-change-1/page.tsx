"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  FolderOpen,
  BookOpen,
  BarChart3,
  FileText,
  Brain,
  MoreVertical,
  Search,
  Clock,
  AlertCircle,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dummy line items for engine change work order
const lineItems = [
  {
    id: "1",
    chapter: "72 - Engine",
    item: "01",
    taskNo: "72-00-00-200-801",
    title: "ENGINE REMOVAL - CFM56-5B SERIES ENGINE - REMOVAL FROM AIRCRAFT PYLON",
    mroReference: "2000803421",
    status: "Awaiting",
    aiFindings: "Yes",
  },
  {
    id: "2",
    chapter: "72 - Engine",
    item: "02",
    taskNo: "72-00-00-200-802",
    title: "ENGINE INSTALLATION - CFM56-5B SERIES ENGINE - INSTALLATION TO AIRCRAFT PYLON",
    mroReference: "2000803422",
    status: "Complete",
    aiFindings: "Yes",
  },
  {
    id: "3",
    chapter: "72 - Engine",
    item: "03",
    taskNo: "72-00-00-400-801",
    title: "ENGINE RUN - POST INSTALLATION ENGINE GROUND RUN AND OPERATIONAL CHECK",
    mroReference: "2000803423",
    status: "Complete",
    aiFindings: "No",
  },
  {
    id: "4",
    chapter: "72 - Engine",
    item: "04",
    taskNo: "72-21-00-200-801",
    title: "FAN MODULE - BORESCOPE INSPECTION OF FAN BLADES AND SPINNER ASSEMBLY",
    mroReference: "2000803424",
    status: "Complete",
    aiFindings: "No",
  },
  {
    id: "5",
    chapter: "72 - Engine",
    item: "05",
    taskNo: "72-31-00-200-801",
    title: "COMPRESSOR MODULE - HPC BORESCOPE INSPECTION STAGES 1 THROUGH 9",
    mroReference: "2000803425",
    status: "Complete",
    aiFindings: "No",
  },
  {
    id: "6",
    chapter: "72 - Engine",
    item: "06",
    taskNo: "72-51-00-200-801",
    title: "TURBINE SECTION - HPT BORESCOPE INSPECTION STAGE 1 AND 2 BLADES",
    mroReference: "2000803426",
    status: "Complete",
    aiFindings: "No",
  },
  {
    id: "7",
    chapter: "73 - Engine Fuel",
    item: "07",
    taskNo: "73-21-00-200-801",
    title: "FUEL CONTROL - HYDROMECHANICAL UNIT (HMU) OPERATIONAL TEST AND LEAK CHECK",
    mroReference: "2000803427",
    status: "Complete",
    aiFindings: "No",
  },
  {
    id: "8",
    chapter: "73 - Engine Fuel",
    item: "08",
    taskNo: "73-11-00-200-801",
    title: "FUEL DISTRIBUTION - ENGINE FUEL MANIFOLD LEAK CHECK AND INSPECTION",
    mroReference: "2000803428",
    status: "Complete",
    aiFindings: "No",
  },
  {
    id: "9",
    chapter: "79 - Oil",
    item: "09",
    taskNo: "79-21-00-200-801",
    title: "OIL SYSTEM - ENGINE OIL TANK SERVICE AND LEVEL CHECK POST INSTALLATION",
    mroReference: "2000803429",
    status: "Complete",
    aiFindings: "No",
  },
  {
    id: "10",
    chapter: "79 - Oil",
    item: "10",
    taskNo: "79-31-00-200-801",
    title: "OIL SYSTEM - MAGNETIC CHIP DETECTOR INSPECTION AND DEBRIS ANALYSIS",
    mroReference: "2000803430",
    status: "Complete",
    aiFindings: "No",
  },
]

export default function EngineChangePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<"line-items" | "removal">("line-items")
  const [currentPage, setCurrentPage] = useState(1)
  
  const filteredItems = lineItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.taskNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mroReference.includes(searchQuery)
  )

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Awaiting":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  const getAIFindingsBadgeClass = (findings: string) => {
    switch (findings) {
      case "No":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
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
            <Sparkles className="h-4 w-4" />
            Ticket Explorer
          </Link>
          <Link href="/mockup-2" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 bg-emerald-50 rounded-lg font-medium">
            <FolderOpen className="h-4 w-4 text-emerald-600" />
            End of Lease Projects
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <Pencil className="h-4 w-4" />
            Maintenance Review
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <BookOpen className="h-4 w-4" />
            IATA Binder
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-slate-200">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <BarChart3 className="h-4 w-4" />
            Statistics
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <FileText className="h-4 w-4" />
            Document Repository
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
            <Brain className="h-4 w-4" />
            Domain Knowledge
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[200px]">
        {/* Breadcrumb */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/mockup-2" className="hover:text-slate-700">Aircraft Projects</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/mockup-2" className="hover:text-slate-700">Maintenance Planning</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900 font-medium">Engine Change #1</span>
          </div>
        </div>

        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-200">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              WO-2025-002 : Engine Change #1 - CFM56-5B Engine Replacement
            </h1>
            <div className="flex items-center gap-2">
              <Button className="bg-[#7C9A92] hover:bg-[#6B8A82] text-white">
                Complete Work Order
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Work Order Details */}
          <div className="grid grid-cols-4 gap-8 mb-6">
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Work Order No.</div>
              <div className="text-sm text-slate-600">WO-2025-002</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">WO Name</div>
              <div className="text-sm text-slate-600">Engine Change #1 - CFM56-5B Replacement</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Aircraft</div>
              <div className="text-sm text-slate-600">A321-200 - JA112A</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Maintenance Organisation</div>
              <div className="text-sm text-slate-600">Lufthansa Technik AG</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-medium text-slate-900 mb-1">Applicable Documentation</div>
            <div className="text-sm text-slate-500">AMM 72-00-00, EMM CFM56-5B Series</div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">WO Revision</div>
              <div className="text-sm text-slate-600">02</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">WO Date</div>
              <div className="text-sm text-slate-600">2025-09-01</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">WO Completion Date</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">2025-09-15</span>
                <button className="text-slate-400 hover:text-slate-600">
                  <Pencil className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">STATS</div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4 px-4 py-3 bg-white border border-slate-200 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-[#7C9A92]/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#7C9A92]" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700">Job Cards</div>
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-xl font-bold text-slate-900">10</span>
                    <span className="text-xs text-slate-500 ml-1">Total</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-900">0</span>
                    <span className="text-xs text-slate-500">AI Findings</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 py-3 bg-white border border-slate-200 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-[#7C9A92]/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#7C9A92]" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700">Non Routine Job Cards</div>
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-xl font-bold text-slate-900">0</span>
                    <span className="text-xs text-slate-500 ml-1">Total</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-900">0</span>
                    <span className="text-xs text-slate-500">AI Findings</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 py-3 bg-white border border-slate-200 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-[#7C9A92]/10 flex items-center justify-center">
                <LayoutGrid className="h-5 w-5 text-[#7C9A92]" />
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700">Components</div>
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-xl font-bold text-slate-900">1</span>
                    <span className="text-xs text-slate-500 ml-1">Total</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-900">0</span>
                    <span className="text-xs text-slate-500">AI Findings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-slate-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("line-items")}
              className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
                activeTab === "line-items"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Line Items
              <Badge variant="secondary" className="bg-slate-200 text-slate-700">{lineItems.length}</Badge>
            </button>
            <button
              onClick={() => setActiveTab("removal")}
              className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-2 ${
                activeTab === "removal"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Removal/Installation
              <Badge variant="secondary" className="bg-slate-200 text-slate-700">1</Badge>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search line items"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white border-slate-200"
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Search by: Item No, Task No, Chapter No, Description or MRO references
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="all-chapters">
                <SelectTrigger className="w-[140px] bg-white">
                  <SelectValue placeholder="All Chapters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-chapters">All Chapters</SelectItem>
                  <SelectItem value="72">72 - Engine</SelectItem>
                  <SelectItem value="73">73 - Engine Fuel</SelectItem>
                  <SelectItem value="79">79 - Oil</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-[120px] bg-white">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                  <SelectItem value="awaiting">Awaiting</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-findings">
                <SelectTrigger className="w-[140px] bg-white">
                  <SelectValue placeholder="All AI Findings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-findings">All AI Findings</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="px-6 py-4">
          <div className="text-sm text-slate-600 mb-4">
            Showing 1 to {filteredItems.length} of {filteredItems.length} Line Items
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Chapter</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Item</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Task No.</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Title/Description</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">MRO Reference</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="text-left p-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">AI Findings</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      if (item.status === "Awaiting" || item.item === "02") {
                        router.push(`/mockup-2/work-order/engine-change-1/line-item/${item.item}`)
                      }
                    }}
                    className={`border-b border-slate-100 hover:bg-slate-50 ${
                      item.status === "Awaiting" || item.item === "02" ? "cursor-pointer" : "cursor-default"
                    } ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    <td className="p-3 text-slate-700 max-w-[140px]">
                      <div className="truncate">{item.chapter}</div>
                    </td>
                    <td className="p-3 text-slate-900 font-medium">{item.item}</td>
                    <td className="p-3 text-slate-700 font-mono text-xs">{item.taskNo}</td>
                    <td className="p-3 text-slate-700 max-w-[350px]">
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
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button variant="default" size="sm" className="h-8 w-8 bg-[#7C9A92] hover:bg-[#6B8A82]">
              1
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
