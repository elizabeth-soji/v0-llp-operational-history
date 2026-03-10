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
  CheckCircle2,
  XCircle,
  MinusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Line item data for engine tasks
const lineItemData = {
  "01": {
    title: "ENGINE REMOVAL - CFM56-5B SERIES ENGINE - REMOVAL FROM AIRCRAFT PYLON",
    chapter: "72 - Engine",
    itemNo: "01",
    status: "Awaiting",
    mroReference: "2000803421",
    taskNo: "72-00-00-200-801",
    references: "AMM 72-00-00, EMM CFM56-5B",
    applicableDocumentation: "SB CFM56-5B-72-0045, AD 2024-15-06",
  },
  "02": {
    title: "ENGINE INSTALLATION - CFM56-5B SERIES ENGINE - INSTALLATION TO AIRCRAFT PYLON",
    chapter: "72 - Engine",
    itemNo: "02",
    status: "Complete",
    mroReference: "2000803422",
    taskNo: "72-00-00-200-802",
    references: "AMM 72-00-00, EMM CFM56-5B",
    applicableDocumentation: "SB CFM56-5B-72-0046, AD 2024-15-07",
  },
}

// Compliance checks data - different for each item
const complianceChecksData = {
  "01": {
    general: {
      status: "failed",
      checks: [
        {
          id: "1",
          title: "Line Item has Related Task Card",
          description: "Line Items should be associated with a Task Card",
          status: "passed",
        },
        {
          id: "2",
          title: "Non-Routine Line Item has Related Discrepancy Report",
          description: "The Non-Routine Line Item is not associated with a Discrepancy Report.",
          status: "failed",
        },
        {
          id: "3",
          title: "Service Bulletin Referenced but Not Found",
          description: "Referenced service bulletin SB CFM56-5B-72-0045 could not be located in the document repository.",
          status: "neutral",
        },
        {
          id: "4",
          title: "Engine Serial Number Matches Work Order",
          description: "Engine serial number on line item matches the work order specification.",
          status: "passed",
        },
        {
          id: "5",
          title: "Required Tooling Documented",
          description: "All required special tooling has been documented for the task.",
          status: "passed",
        },
      ],
    },
    discrepancyReports: {
      status: "passed",
      checks: [
        {
          id: "6",
          title: "Discrepancy Report Properly Closed",
          description: "All associated discrepancy reports have been properly closed and signed off.",
          status: "passed",
        },
        {
          id: "7",
          title: "Corrective Action Documented",
          description: "Corrective actions for all discrepancies have been documented.",
          status: "passed",
        },
      ],
    },
  },
  "02": {
    general: {
      status: "passed",
      checks: [
        {
          id: "1",
          title: "Line Item has Related Task Card",
          description: "Line Items should be associated with a Task Card",
          status: "passed",
        },
        {
          id: "2",
          title: "Service Bulletin Referenced but Not Found",
          description: "Referenced service bulletin SB CFM56-5B-72-0046 could not be located in the document repository.",
          status: "neutral",
        },
        {
          id: "3",
          title: "Engine Serial Number Matches Work Order",
          description: "Engine serial number on line item matches the work order specification.",
          status: "passed",
        },
        {
          id: "4",
          title: "Required Tooling Documented",
          description: "All required special tooling has been documented for the task.",
          status: "passed",
        },
        {
          id: "5",
          title: "Torque Values Verified",
          description: "All engine mount torque values have been verified and documented.",
          status: "passed",
        },
      ],
    },
    discrepancyReports: {
      status: "passed",
      checks: [
        {
          id: "6",
          title: "Discrepancy Report Properly Closed",
          description: "All associated discrepancy reports have been properly closed and signed off.",
          status: "passed",
        },
        {
          id: "7",
          title: "Corrective Action Documented",
          description: "Corrective actions for all discrepancies have been documented.",
          status: "passed",
        },
      ],
    },
  },
}

export default function EngineChangeLineItemPage() {
  const params = useParams()
  const itemId = params.itemId as string
  const [selectedCheck, setSelectedCheck] = useState<"general" | "discrepancyReports">("general")

  const lineItem = lineItemData[itemId as keyof typeof lineItemData] || lineItemData["01"]
  const complianceChecks = complianceChecksData[itemId as keyof typeof complianceChecksData] || complianceChecksData["01"]
  const currentChecks = complianceChecks[selectedCheck]

  const getCheckStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "neutral":
        return <MinusCircle className="h-5 w-5 text-slate-400" />
      default:
        return null
    }
  }

  const getCheckBgColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-emerald-50 border-l-4 border-l-emerald-500"
      case "failed":
        return "bg-red-50 border-l-4 border-l-red-500"
      case "neutral":
        return "bg-slate-50 border-l-4 border-l-slate-400"
      default:
        return "bg-slate-50"
    }
  }

  return (
    <div className="flex bg-white min-h-screen">
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
            <LayoutGrid className="h-4 w-4" />
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
        <div className="flex items-center gap-2 px-6 py-4 text-sm text-slate-600 border-b border-slate-200">
          <Link href="/mockup-2/work-order/engine-change-1" className="hover:text-slate-900">Line Items</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 font-medium">{lineItem.itemNo}</span>
        </div>

        {/* Header */}
        <div className="px-6 py-6 border-b border-slate-200">
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold text-slate-900 max-w-3xl">
              {lineItem.title}
            </h1>
            <div className="flex items-center gap-2">
              <Link href="/mockup-2/work-order/engine-change-1">
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
              <div className="text-sm text-slate-600">{lineItem.chapter}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Item No.</div>
              <div className="text-sm text-slate-600">{lineItem.itemNo}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Status</div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                {lineItem.status}
              </Badge>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-x-12 gap-y-4">
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">MRO References</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">{lineItem.mroReference}</span>
                <button className="text-slate-400 hover:text-slate-600">
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
              <div className="text-sm text-slate-600">{lineItem.references}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-slate-900 mb-1">Applicable Documentation</div>
              <div className="text-sm text-slate-600">{lineItem.applicableDocumentation}</div>
            </div>
          </div>
        </div>

        {/* Compliance Checks Section */}
        <div className="p-6">
          <div className="flex gap-6">
            {/* Left Panel - Check Categories */}
            <div className="w-[280px] border border-slate-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Compliance Checks</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCheck("general")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                    selectedCheck === "general"
                      ? "bg-slate-100 font-medium"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <span>General</span>
                  <Badge
                    variant="outline"
                    className={
                      complianceChecks.general.status === "passed"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {complianceChecks.general.status === "passed" ? "Passed" : "Failed"}
                  </Badge>
                </button>
                <button
                  onClick={() => setSelectedCheck("discrepancyReports")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm ${
                    selectedCheck === "discrepancyReports"
                      ? "bg-slate-100 font-medium"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <span>Discrepancy Reports</span>
                  <Badge
                    variant="outline"
                    className={
                      complianceChecks.discrepancyReports.status === "passed"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {complianceChecks.discrepancyReports.status === "passed" ? "Passed" : "Failed"}
                  </Badge>
                </button>
              </div>
            </div>

            {/* Right Panel - Check Details */}
            <div className="flex-1 border border-slate-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  {selectedCheck === "general" ? "General" : "Discrepancy Reports"}
                </h3>
                <Badge
                  variant="outline"
                  className={
                    currentChecks.status === "passed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }
                >
                  {currentChecks.status === "passed" ? "Passed" : "Failed"}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Automated checks for this line item in the selected document type
              </p>

              <div className="space-y-3">
                {currentChecks.checks.map((check) => (
                  <div
                    key={check.id}
                    className={`p-4 rounded-lg ${getCheckBgColor(check.status)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getCheckStatusIcon(check.status)}
                      <div>
                        <h4 className="font-medium text-slate-900">{check.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{check.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
