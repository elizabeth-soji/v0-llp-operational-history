"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Folder,
  Download,
  Upload,
  FileText,
  PenTool,
} from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PartDetailsPage({
  params,
}: {
  params: { id: string; subId: string; partId: string }
}) {
  const { id, subId, partId } = params

  // CHANGE: Different component data based on subId (H001 vs H002)
  const partData =
    subId === "h002" || subId === "H002"
      ? {
          // OC/CM Component data
          itemNumber: partId,
          nomenclature: "Engine Fuel Pump",
          partNumber: "654321-0789",
          serialNumber: "SN654321",
          position: "Engine 1",
          mpdReference: "MPD-71-51-01",
          interval: "On Condition",
          threshold: "Visual Inspection",
          lastCompleted: "14/08/2025",
          nextDue: "Continuous Monitoring",
          status: "operational",
          priority: "medium",
        }
      : {
          // Hard Time Component data (existing)
          itemNumber: partId,
          nomenclature: "Hydraulic Pump Assembly",
          partNumber: "123456-0001",
          serialNumber: "SN123456",
          position: "Left Wing",
          mpdReference: "MPD-29-21-01",
          interval: "12,000 FH / 6,000 FC",
          threshold: "10,800 FH / 5,400 FC",
          lastCompleted: "14/08/2025",
          nextDue: "18/12/2025",
          status: "airworthy",
          priority: "high",
        }

  const aircraftData = {
    tsn: "16,635:51",
    csn: "14,538",
    statusDate: "24-Oct-2025",
  }

  // CHANGE: Removed deliveryClearance object and hasWarning calculation as the section is being removed

  // Compliance checks data
  const complianceChecks = [
    {
      name: "ARC - Part Number Match",
      linkedDocument: "ARC-2024-001",
      result: "failed",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: false,
      override: false,
      checkDetails: "Part number mismatch detected",
    },
    {
      name: "ARC - Serial Number Match",
      linkedDocument: "ARC-2024-001",
      result: "pass",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Serial number verified",
    },
    {
      name: "ARC - Part Hours Validation",
      linkedDocument: "ARC-2024-001",
      result: "pass",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Part hours within limits",
    },
    {
      name: "ARC - Cycles Validation",
      linkedDocument: "ARC-2024-001",
      result: "pass",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: false,
      override: false,
      checkDetails: "Cycles count verified",
    },
    {
      name: "ARC - Signature Verification",
      linkedDocument: "ARC-2024-001",
      result: "pass",
      updated: "Oct 23",
      performedBy: "Sarah Chen",
      type: "Manual",
      manualVerified: true,
      override: false,
      checkDetails: "Authorized signature confirmed",
    },
    {
      name: "DFP - Removal Part Number",
      linkedDocument: "DFP-2024-089",
      result: "pass",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Removal part number verified",
    },
    {
      name: "DFP - Removal Serial Number",
      linkedDocument: "DFP-2024-089",
      result: "pass",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Removal serial number verified",
    },
    {
      name: "DFP - Install Part Number",
      linkedDocument: "DFP-2024-089",
      result: "pass",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Install part number verified",
    },
    {
      name: "DFP - Install Serial Number",
      linkedDocument: "DFP-2024-089",
      result: "pass",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Install serial number verified",
    },
    {
      name: "DFP - Installation Date",
      linkedDocument: "DFP-2024-089",
      result: "pass",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Installation date verified",
    },
    {
      name: "DFP - Signature Verification",
      linkedDocument: "DFP-2024-089",
      result: "pass",
      updated: "Oct 22",
      performedBy: "Mike Johnson",
      type: "Manual",
      manualVerified: true,
      override: false,
      checkDetails: "Signature authenticated",
    },
  ]

  const documentNodes = [
    {
      id: "DFP",
      name: "DFP-2024-089",
      fullName: "Detailed Fitting Position",
      uploaded: true,
      checks: [
        {
          name: "Removal Part Number",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 3:45 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Removal part number verified",
        },
        {
          name: "Removal Serial Number",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 3:50 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Removal serial number verified",
        },
        {
          name: "Install Part Number",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 4:00 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Install part number verified",
        },
        {
          name: "Install Serial Number",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 4:10 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Install serial number verified",
        },
        {
          name: "Installation Date",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 4:20 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Installation date verified",
        },
        {
          name: "Signature",
          status: "pass",
          type: "Manual",
          performedBy: "Mike Johnson",
          timestamp: "Oct 22, 5:10 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Signature authenticated",
        },
      ],
    },
    {
      id: "ARC",
      name: "ARC-2024-001",
      fullName: "Authorized Release Certificate",
      uploaded: true,
      checks: [
        {
          name: "Part Number",
          status: "failed",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:15 AM",
          manualVerified: false,
          manualVerifiedBy: null,
          details: "Part number mismatch detected",
        },
        {
          name: "Serial Number",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:15 AM",
          manualVerified: true,
          manualVerifiedBy: "Sarah Chen",
          details: "Serial number verified",
        },
        {
          name: "Part Hours",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:16 AM",
          manualVerified: true,
          manualVerifiedBy: "Sarah Chen",
          details: "Part hours within limits",
        },
        {
          name: "Cycles",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:16 AM",
          manualVerified: false,
          manualVerifiedBy: null,
          details: "Cycles count verified",
        },
        {
          name: "Signature",
          status: "pass",
          type: "Manual",
          performedBy: "Sarah Chen",
          timestamp: "Oct 23, 2:30 PM",
          manualVerified: true,
          manualVerifiedBy: "Sarah Chen",
          details: "Authorized signature confirmed",
        },
      ],
    },
  ]

  const getDocumentStatus = (checks: any[]) => {
    // If any check failed, document is failed
    if (checks.some((check) => check.status === "failed")) {
      return "failed"
    }
    // If any check is pending, document is pending
    if (checks.some((check) => check.status === "pending")) {
      return "pending"
    }
    // If all checks passed but not all are manually verified, status is "in-progress"
    const allPassed = checks.every((check) => check.status === "pass")
    const allManuallyVerified = checks.every((check) => check.manualVerified)

    if (allPassed && !allManuallyVerified) {
      return "in-progress"
    }
    // If all checks passed and all are manually verified, status is "pass"
    if (allPassed && allManuallyVerified) {
      return "pass"
    }
    return "pending"
  }

  const getStatusColors = (status: string) => {
    switch (status) {
      case "pass":
        return {
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgb(236, 253, 245)",
          badgeClass: "bg-emerald-600",
          icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
          label: "Pass",
        }
      case "failed":
        return {
          borderColor: "rgb(244, 63, 94)",
          backgroundColor: "rgb(255, 241, 242)",
          badgeClass: "bg-rose-600",
          icon: <XCircle className="h-5 w-5 text-rose-600" />,
          label: "Failed",
        }
      case "in-progress":
        return {
          borderColor: "rgb(245, 158, 11)",
          backgroundColor: "rgb(254, 243, 199)",
          badgeClass: "bg-amber-600",
          icon: <Clock className="h-5 w-5 text-amber-600" />,
          label: "In Progress",
        }
      case "pending":
      default:
        return {
          borderColor: "rgb(245, 158, 11)",
          backgroundColor: "rgb(254, 243, 199)",
          badgeClass: "bg-amber-600",
          icon: <Clock className="h-5 w-5 text-amber-600" />,
          label: "Pending",
        }
    }
  }

  const handleDocumentPreview = (docName: string) => {
    setPreviewDocument(docName)
    setShowDocumentPreview(true)
  }

  const handleDigitalSignature = (checkName: string) => {
    setVerifyingCheck(checkName)
    setShowSignatureDialog(true)
  }

  const submitDigitalSignature = () => {
    if (signatureName && signaturePassword) {
      console.log("[v0] Digital signature submitted for:", verifyingCheck)
      setShowSignatureDialog(false)
      setSignatureName("")
      setSignaturePassword("")
      setVerifyingCheck(null)
    }
  }

  const [showDocumentPreview, setShowDocumentPreview] = useState(false)
  const [previewDocument, setPreviewDocument] = useState<string>("")
  const [showSignatureDialog, setShowSignatureDialog] = useState(false)
  const [signatureName, setSignatureName] = useState("")
  const [signaturePassword, setSignaturePassword] = useState("")
  const [verifyingCheck, setVerifyingCheck] = useState<string | null>(null)

  const failedCount = complianceChecks.filter((c) => c.result === "failed").length
  const passedCount = complianceChecks.filter((c) => c.result === "pass").length
  const pendingCount = complianceChecks.filter((c) => c.result === "pending").length
  const totalCount = complianceChecks.length

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/mockup-2/folder/${id}/subfolder/${subId}`}>
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to {subId === "h002" || subId === "H002" ? "OC/CM Components" : "Hard Time Components"}
              </Button>
            </Link>
            <div className="text-sm text-slate-500">
              IATA Binder / H. Component Records /{" "}
              {subId === "h002" || subId === "H002" ? "H002. OC/CM Components" : "H001. Hard Time Components"} / Item #
              {partData.itemNumber}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Folder className="h-4 w-4 mr-2" />
              AI Record Management System
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
            <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
              <Download className="h-4 w-4 mr-2" />
              {subId === "h002" || subId === "H002" ? "OC/CM Component Details Report" : "HT Component Details Report"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Project Header */}
      <div className="border-b bg-slate-50 px-6 py-4">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">EFW A321-200 P2F Redelivery</h1>
            <div className="mt-1 flex items-center gap-4 text-sm text-slate-600">
              <span>
                MSN: <span className="font-semibold text-slate-900">7382</span>
              </span>
              <span>
                Registry: <span className="font-semibold text-slate-900">JA112A</span>
              </span>
              <span>
                Delivery: <span className="font-semibold text-slate-900">25/11/2025</span>
              </span>
              <Badge variant="outline" className="border-amber-500 text-amber-700">
                T-31 days
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-500">Overall Progress</div>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[68%] bg-sky-600" />
          </div>
          <div className="text-sm font-semibold text-slate-900">68%</div>
        </div>
      </div>

      {/* CHANGE: Changed grid layout from 2 columns to 3 columns, moved Component Status and Aircraft Status to right sidebar */}
      <div className="grid grid-cols-[300px_1fr_280px] gap-6 p-6">
        {/* Left Sidebar - Part Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Part Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-xs text-slate-500">Nomenclature</div>
                <div className="font-semibold text-slate-900">{partData.nomenclature}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Part Number</div>
                <div className="font-mono text-slate-900">{partData.partNumber}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Serial Number</div>
                <div className="font-mono text-slate-900">{partData.serialNumber}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Position</div>
                <div className="font-semibold text-slate-900">{partData.position}</div>
              </div>
            </CardContent>
          </Card>

          {/* MPD Interval - Only show for Hard Time components (H001) */}
          {(subId === "h001" || subId === "H001") && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">MPD Interval</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 mb-2 border-b">
                  <span className="text-slate-500">MPD Reference</span>
                  <span className="font-semibold font-mono">{partData.mpdReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FH</span>
                  <span className="font-semibold">2,400 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FC</span>
                  <span className="font-semibold">1,200 cycles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Days</span>
                  <span className="font-semibold">365 days</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Middle Content - Compliance Dashboard */}
        <div className="space-y-6">
          {/* Compliance Progress Dashboard */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">{totalCount}</div>
                  <div className="text-sm text-slate-500">Total Checks</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <div className="text-3xl font-bold text-emerald-600">{passedCount}</div>
                  </div>
                  <div className="text-sm text-slate-500">Passed</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <XCircle className="h-5 w-5 text-rose-600" />
                    <div className="text-3xl font-bold text-rose-600">{failedCount}</div>
                  </div>
                  <div className="text-sm text-slate-500">Failed</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <div className="text-3xl font-bold text-amber-600">{pendingCount}</div>
                  </div>
                  <div className="text-sm text-slate-500">Pending</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Maintenance Details */}
          {(subId === "h001" || subId === "H001") && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Maintenance Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="mb-3 text-sm font-semibold text-slate-700">Last Done</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Flight Hours</span>
                        <span className="font-semibold">16,635</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Flight Cycles</span>
                        <span className="font-semibold">14,538</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Months</span>
                        <span className="font-semibold">58</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date</span>
                        <span className="font-semibold">15-Jan-2020</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 text-sm font-semibold text-slate-700">Next Due</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Flight Hours</span>
                        <span className="font-semibold">36,635</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Flight Cycles</span>
                        <span className="font-semibold">29,538</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Months</span>
                        <span className="font-semibold">178</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Date</span>
                        <span className="font-semibold">15-Nov-2034</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3 text-sm font-semibold text-slate-700">Remaining</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Flight Hours</span>
                        <span className="font-semibold">20,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Flight Cycles</span>
                        <span className="font-semibold">14,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Months</span>
                        <span className="font-semibold">120</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Compliance Graph */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Compliance Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 py-4">
                {documentNodes.map((doc, index) => {
                  const docStatus = getDocumentStatus(doc.checks)
                  const statusColors = getStatusColors(docStatus)

                  return (
                    <div key={doc.id}>
                      <div
                        className="rounded-xl border-2 p-4"
                        style={{
                          borderColor: statusColors.borderColor,
                          backgroundColor: statusColors.backgroundColor,
                        }}
                      >
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-slate-600" />
                              <div className="font-bold text-slate-900">{doc.name}</div>
                              {statusColors.icon}
                            </div>
                            <div className="mt-1 text-sm text-slate-600">{doc.fullName}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            {doc.uploaded ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleDocumentPreview(doc.name)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-amber-500 text-amber-700 hover:bg-amber-50 bg-transparent"
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                              </Button>
                            )}
                            <Badge className={statusColors.badgeClass}>{statusColors.label}</Badge>
                          </div>
                        </div>

                        <div className="mt-3 space-y-2 border-t pt-3">
                          <div className="text-xs font-semibold text-slate-700">Compliance Checks:</div>
                          {doc.checks.map((check, checkIndex) => (
                            <div key={checkIndex} className="rounded-lg bg-white/70 border border-slate-200 p-3">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2 flex-1">
                                  {check.status === "pass" && (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                                  )}
                                  {check.status === "failed" && (
                                    <XCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
                                  )}
                                  {check.status === "pending" && (
                                    <Clock className="h-4 w-4 text-amber-600 flex-shrink-0" />
                                  )}
                                  <span className="text-sm font-semibold text-slate-900">{check.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className={
                                      check.type === "AI"
                                        ? "border-purple-500 text-purple-700 text-xs"
                                        : "border-slate-500 text-slate-700 text-xs"
                                    }
                                  >
                                    {check.type}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {check.status}
                                  </Badge>
                                </div>
                              </div>

                              <div className="text-xs text-slate-600 mb-2 ml-6">{check.details}</div>

                              <div className="flex items-center justify-between ml-6 text-xs">
                                <div className="flex items-center gap-3 text-slate-500">
                                  <span>
                                    By:{" "}
                                    <span className="font-semibold text-slate-700">
                                      {check.manualVerified && check.manualVerifiedBy
                                        ? check.manualVerifiedBy
                                        : check.performedBy}
                                    </span>
                                  </span>
                                  <span>{check.timestamp}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-slate-500">Manual Verified:</span>
                                  <Checkbox checked={check.manualVerified} disabled />
                                  {check.manualVerified ? (
                                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="h-6 text-xs border-blue-500 text-blue-700 hover:bg-blue-50 bg-transparent"
                                      onClick={() => handleDigitalSignature(`${doc.name}-${check.name}`)}
                                    >
                                      <PenTool className="h-3 w-3 mr-1" />
                                      Sign to Verify
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Connection line to next document */}
                      {index < documentNodes.length - 1 && <div className="ml-8 h-6 w-0.5 bg-slate-300" />}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Status sections moved here and Team Chat/Recent Activity */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aircraft Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Aircraft TSN</span>
                <span className="font-mono font-semibold">{aircraftData.tsn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Aircraft CSN</span>
                <span className="font-mono font-semibold">{aircraftData.csn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status Date</span>
                <span className="font-semibold">{aircraftData.statusDate}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-rose-600" />
                  <div>
                    <div className="font-semibold text-slate-900">Compliance check failed</div>
                    <div className="text-xs text-slate-500">Part number mismatch - 2 hours ago</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                  <div>
                    <div className="font-semibold text-slate-900">MPD validation passed</div>
                    <div className="text-xs text-slate-500">Daniel Ferguson - 5 hours ago</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-sky-600" />
                  <div>
                    <div className="font-semibold text-slate-900">Document uploaded</div>
                    <div className="text-xs text-slate-500">ARC-2024-001.pdf - 1 day ago</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-amber-600" />
                  <div>
                    <div className="font-semibold text-slate-900">AIR check pending</div>
                    <div className="text-xs text-slate-500">Awaiting inspection - 1 day ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showDocumentPreview} onOpenChange={setShowDocumentPreview}>
        <DialogContent className="max-w-7xl max-h-[95vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Document Preview: {previewDocument}</DialogTitle>
              <Button
                variant="outline"
                className="h-7 px-2 py-1 text-xs bg-transparent"
                onClick={() => {
                  const docUrl = previewDocument.includes("ARC") ? "/arc-document.png" : "#"
                  window.open(docUrl, "_blank")
                }}
              >
                <FileText className="mr-1 h-3 w-3" />
                Open in New Tab
              </Button>
            </div>
          </DialogHeader>
          <div className="overflow-auto max-h-[85vh]">
            {previewDocument.includes("ARC") ? (
              <img src="/arc-document.png" alt="ARC Document" className="w-full h-auto" />
            ) : (
              <div className="flex items-center justify-center h-96 bg-slate-100 rounded-lg">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">Document preview for {previewDocument}</p>
                  <p className="text-sm text-slate-500 mt-2">
                    In a real application, the document would be displayed here
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSignatureDialog} onOpenChange={setShowSignatureDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5 text-blue-600" />
              Digital Signature Required
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                Manual verification requires your digital signature to confirm compliance. This is the final
                verification step.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sig-name">Full Name</Label>
              <Input
                id="sig-name"
                placeholder="Enter your full name"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sig-password">Password</Label>
              <Input
                id="sig-password"
                type="password"
                placeholder="Enter your password"
                value={signaturePassword}
                onChange={(e) => setSignaturePassword(e.target.value)}
              />
            </div>
            <div className="text-xs text-slate-600">
              Verifying: <span className="font-semibold">{verifyingCheck}</span>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSignatureDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={submitDigitalSignature}
                disabled={!signatureName || !signaturePassword}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PenTool className="mr-2 h-4 w-4" />
                Sign and Verify
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
