"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Bot,
  User,
  ShieldCheck,
} from "lucide-react"
import Link from "next/link"

export default function ADDetailsPage({ params }: { params: { adId: string } }) {
  const { adId } = params

  // AD data based on adId
  const adData = {
    easaAd: adId === "1" ? "2016-0015" : adId === "2" ? "2012-0175R2" : "2012-0032R1",
    faaAd: adId === "2" ? "2013-17-09" : "",
    subject:
      adId === "1"
        ? "ATA 53 – FUSELAGE – Door Stop Fitting Holes – Inspection / Repair"
        : adId === "2"
          ? "ATA 27 - FLIGHT CONTROLS-Trimmable Horizontal Stabilizer Actuator ball screw Lower Splines - Inspection / Replacement"
          : "ATA 57 - WINGS – Outer Wing Main Landing Gear Support Rib 5 Fitting – Inspection / Modification",
    effectiveDate: adId === "1" ? "29 January 2016" : adId === "2" ? "4 February 2016" : "8 December 2015",
    referenceDoc:
      adId === "2"
        ? "SB A320-27-1214\nGOODRICH ACTUATION SYSTEMS SB 47145-27-16"
        : adId === "3"
          ? "SB A320-57-1118 R3\nSB A320-57-1138 R1\nSB A320-57A1166 R1"
          : "",
    compliance: adId === "1" ? "Superseded" : adId === "2" ? "Open" : "Repetitive",
    supersedesAd: adId === "1" ? "2015-0245" : adId === "2" ? "2012-0175R1" : "",
    ataChapter: adId === "1" ? "53" : adId === "2" ? "27" : "57",
    issueDate: adId === "1" ? "29 January 2016" : adId === "2" ? "4 February 2016" : "8 December 2015",
    amendmentNumber: adId === "1" ? "AD 2016-0015" : adId === "2" ? "AD 2012-0175R2" : "AD 2012-0032R1",
    applicability: "All A320 Family Aircraft",
    complianceDate: adId === "2" ? "Before 15 March 2016" : "As per AD requirements",
  }

  const aircraftData = {
    tsn: "16,635:51",
    csn: "14,538",
    statusDate: "24-Oct-2025",
  }

  // Compliance checks data
  const complianceChecks = [
    {
      name: "AD Document Review",
      linkedDocument: `${adData.easaAd}-DOC`,
      result: adId === "2" ? "failed" : "pass",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: adId !== "2",
      override: false,
      checkDetails: adId === "2" ? "Document review pending" : "AD copy reviewed and verified",
    },
    {
      name: "Regulatory Authority Validation",
      linkedDocument: `${adData.easaAd}-REG-AUTH`,
      result: "pass",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "AD issued by authorized regulatory authority",
    },
    {
      name: "Version Check",
      linkedDocument: `${adData.easaAd}-VERSION`,
      result: "pass",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Latest revision of AD confirmed",
    },
    {
      name: "Applicability Check",
      linkedDocument: `${adData.easaAd}-APP`,
      result: "pass",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Aircraft is applicable to this AD",
    },
    {
      name: "Compliance Status Verification",
      linkedDocument: `${adData.easaAd}-COMP`,
      result: "pass",
      updated: "Oct 23",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Compliance status verified",
    },
    {
      name: "Service Bulletin Cross-Reference",
      linkedDocument: adData.referenceDoc.split("\n")[0] || "N/A",
      result: adData.referenceDoc ? "pass" : "pending",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: !!adData.referenceDoc,
      override: false,
      checkDetails: adData.referenceDoc ? "Service bulletin verified" : "No service bulletin referenced",
    },
    {
      name: "Effective Date Validation",
      linkedDocument: `${adData.easaAd}-DATE`,
      result: "pass",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: true,
      override: false,
      checkDetails: "Effective date within valid range",
    },
    {
      name: "Signature Verification",
      linkedDocument: `${adData.easaAd}-SIG`,
      result: "pass",
      updated: "Oct 22",
      performedBy: "Mike Johnson",
      type: "Manual",
      manualVerified: true,
      override: false,
      checkDetails: "Authorized signature confirmed",
    },
    {
      name: "Instructions Review",
      linkedDocument: adData.referenceDoc.split("\n")[0] || "N/A",
      result: adData.referenceDoc ? "pass" : "pending",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: !!adData.referenceDoc,
      override: false,
      checkDetails: adData.referenceDoc
        ? "Engineering Order/Service Bulletin instructions verified"
        : "Accomplishment instructions pending",
    },
    {
      name: "Procedure Validation",
      linkedDocument: adData.referenceDoc.split("\n")[0] || "N/A",
      result: adData.referenceDoc ? "pass" : "pending",
      updated: "Oct 22",
      performedBy: "QA-Bot",
      type: "AI",
      manualVerified: !!adData.referenceDoc,
      override: false,
      checkDetails: adData.referenceDoc
        ? "Maintenance procedures align with AD requirements"
        : "Procedure validation pending",
    },
    {
      name: "Task Card Certification",
      linkedDocument: `${adData.easaAd}-TASK-CARDS`,
      result: "pass",
      updated: "Oct 22",
      performedBy: "Mike Johnson",
      type: "Manual",
      manualVerified: true,
      override: false,
      checkDetails: "Maintenance task cards certified and approved",
    },
    {
      name: "Task Completion Verification",
      linkedDocument: `${adData.easaAd}-TASK-COMP`,
      result: adId === "2" ? "pending" : "pass",
      updated: "Oct 22",
      performedBy: adId === "2" ? "Pending" : "Sarah Chen",
      type: "Manual",
      manualVerified: adId !== "2",
      override: false,
      checkDetails:
        adId === "2"
          ? "Task completion pending field verification"
          : "All maintenance tasks completed per card instructions",
    },
    {
      name: "Sign-off Validation",
      linkedDocument: `${adData.easaAd}-SIGN-OFF`,
      result: adId === "2" ? "pending" : "pass",
      updated: "Oct 22",
      performedBy: adId === "2" ? "Pending" : "Mike Johnson",
      type: "Manual",
      manualVerified: adId !== "2",
      override: false,
      checkDetails: adId === "2" ? "Authorized sign-off pending" : "Authorized personnel sign-off confirmed",
    },
  ]

  const documentNodes = [
    {
      id: "AD_COPY",
      name: `${adData.easaAd}-AD-COPY`,
      fullName: "AD Copy",
      uploaded: true,
      checks: [
        {
          name: "Effective Date Match",
          status: adId === "2" ? "failed" : "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:15 AM",
          manualVerified: adId !== "2",
          manualVerifiedBy: adId !== "2" ? "Sarah Chen" : null,
          details: adId === "2" ? "Effective date verification pending" : "Effective date matches AD requirements",
        },
        {
          name: "Description Match",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:17 AM",
          manualVerified: true,
          manualVerifiedBy: "Sarah Chen",
          details: "AD description matches official record",
        },
        {
          name: "Version Match",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:20 AM",
          manualVerified: true,
          manualVerifiedBy: "Sarah Chen",
          details: "Latest revision of AD confirmed",
        },
        {
          name: "Revisions",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:22 AM",
          manualVerified: true,
          manualVerifiedBy: "Sarah Chen",
          details: "All AD revisions documented and current",
        },
        {
          name: "Aircraft Type Matched",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:25 AM",
          manualVerified: true,
          manualVerifiedBy: "Sarah Chen",
          details: "Aircraft type matches AD applicability",
        },
        {
          name: "Aircraft Applicability Match",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:27 AM",
          manualVerified: true,
          manualVerifiedBy: "Sarah Chen",
          details: "Aircraft serial number within AD applicability range",
        },
        {
          name: "Reference Publication Match",
          status: adData.referenceDoc ? "pass" : "pending",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 23, 10:30 AM",
          manualVerified: !!adData.referenceDoc,
          manualVerifiedBy: adData.referenceDoc ? "Sarah Chen" : null,
          details: adData.referenceDoc
            ? "Reference publications match AD requirements"
            : "Reference publication verification pending",
        },
      ],
    },
    {
      id: "ACCOMPLISHMENT",
      name: adData.referenceDoc.split("\n")[0] || "N/A",
      fullName: "Accomplishment Instructions (EO/SB)",
      uploaded: !!adData.referenceDoc,
      checks: [
        {
          name: "SB Number Match",
          status: adData.referenceDoc ? "pass" : "pending",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 3:45 PM",
          manualVerified: !!adData.referenceDoc,
          manualVerifiedBy: adData.referenceDoc ? "Mike Johnson" : null,
          details: adData.referenceDoc
            ? "Service Bulletin number matches AD reference"
            : "SB number verification pending",
        },
        {
          name: "SB Version Match",
          status: adData.referenceDoc ? "pass" : "pending",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 3:48 PM",
          manualVerified: !!adData.referenceDoc,
          manualVerifiedBy: adData.referenceDoc ? "Mike Johnson" : null,
          details: adData.referenceDoc
            ? "Service Bulletin version/revision matches AD requirements"
            : "SB version verification pending",
        },
        {
          name: "Title Match",
          status: adData.referenceDoc ? "pass" : "pending",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 3:50 PM",
          manualVerified: !!adData.referenceDoc,
          manualVerifiedBy: adData.referenceDoc ? "Mike Johnson" : null,
          details: adData.referenceDoc ? "Service Bulletin title matches AD subject" : "Title verification pending",
        },
        {
          name: "MSN Match",
          status: adData.referenceDoc ? "pass" : "pending",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 3:52 PM",
          manualVerified: !!adData.referenceDoc,
          manualVerifiedBy: adData.referenceDoc ? "Mike Johnson" : null,
          details: adData.referenceDoc
            ? "Manufacturer Serial Number (MSN) matches applicability"
            : "MSN verification pending",
        },
      ],
    },
    {
      id: "TASK_CARDS",
      name: `${adData.easaAd}-TASK-CARDS`,
      fullName: "Certified Maintenance Task Cards",
      uploaded: true,
      checks: [
        {
          name: "Aircraft MSN Match",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 4:10 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Aircraft Manufacturer Serial Number matches task card records",
        },
        {
          name: "Aircraft Registration Match",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 4:12 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Aircraft registration matches task card documentation",
        },
        {
          name: "Reference Publication Match",
          status: "pass",
          type: "AI",
          performedBy: "QA-Bot",
          timestamp: "Oct 22, 4:15 PM",
          manualVerified: true,
          manualVerifiedBy: "Mike Johnson",
          details: "Task card references match AD requirements and publications",
        },
        {
          name: "Task Card Signature",
          status: adId === "2" ? "pending" : "pass",
          type: "Manual",
          performedBy: adId === "2" ? "Pending" : "Sarah Chen",
          timestamp: adId === "2" ? "—" : "Oct 22, 4:20 PM",
          manualVerified: adId !== "2",
          manualVerifiedBy: adId !== "2" ? "Sarah Chen" : null,
          details: adId === "2" ? "Authorized mechanic signature pending" : "Task card signed by authorized personnel",
        },
        {
          name: "Task Card Stamp",
          status: adId === "2" ? "pending" : "pass",
          type: "Manual",
          performedBy: adId === "2" ? "Pending" : "Mike Johnson",
          timestamp: adId === "2" ? "—" : "Oct 22, 4:25 PM",
          manualVerified: adId !== "2",
          manualVerifiedBy: adId !== "2" ? "Mike Johnson" : null,
          details:
            adId === "2"
              ? "Official maintenance stamp pending"
              : "Task card stamped with official maintenance approval",
        },
      ],
    },
  ]

  const getDocumentStatus = (checks: any[]) => {
    if (checks.some((check) => check.status === "failed")) {
      return "failed"
    }
    if (checks.some((check) => check.status === "pending")) {
      return "pending"
    }
    const allPassed = checks.every((check) => check.status === "pass")
    const allManuallyVerified = checks.every((check) => check.manualVerified)

    if (allPassed && !allManuallyVerified) {
      return "in-progress"
    }
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

  const getComplianceBadgeClass = (compliance: string) => {
    switch (compliance.toLowerCase()) {
      case "superseded":
        return "bg-slate-100 text-slate-700 border-slate-300"
      case "open":
        return "bg-amber-50 text-amber-700 border-amber-300"
      case "repetitive":
        return "bg-blue-50 text-blue-700 border-blue-300"
      case "not applicable":
        return "bg-slate-100 text-slate-600 border-slate-300"
      case "closed":
        return "bg-emerald-50 text-emerald-700 border-emerald-300"
      default:
        return "bg-slate-100 text-slate-700 border-slate-300"
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
            <Link href="/mockup-2/folder/c/subfolder/c006">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Airworthiness Directives
              </Button>
            </Link>
            <div className="text-sm text-slate-500">
              IATA Binder / C. Aircraft Maintenance Records / C006. Airframe and Appliance ADs / {adData.easaAd}
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
              AD Details Report
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

      <div className="grid grid-cols-[300px_1fr] gap-6 p-6">
        {/* Left Sidebar - AD Details */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AD Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-xs text-slate-500">EASA AD</div>
                <div className="font-mono font-semibold text-slate-900">{adData.easaAd}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">FAA AD</div>
                <div className="font-mono text-slate-900">{adData.faaAd || "—"}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Subject</div>
                <div className="text-slate-900">{adData.subject}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Effective Date</div>
                <div className="font-semibold text-slate-900">{adData.effectiveDate}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Reference Doc</div>
                <div className="text-slate-900">
                  {adData.referenceDoc ? (
                    <div className="space-y-1">
                      {adData.referenceDoc.split("\n").map((doc, index) => (
                        <div key={index} className="font-mono text-xs">
                          {doc}
                        </div>
                      ))}
                    </div>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Compliance</div>
                <Badge variant="outline" className={getComplianceBadgeClass(adData.compliance)}>
                  {adData.compliance}
                </Badge>
              </div>
              <div>
                <div className="text-xs text-slate-500">Supersedes AD</div>
                <div className="font-mono text-slate-900">{adData.supersedesAd || "—"}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Means of Compliance or Equivalent Means</div>
                <div className="text-slate-900">
                  {adId === "1"
                    ? "MOD 24591 (STC Modification)"
                    : adId === "2"
                      ? "SB A320-27-1214 Embodiment"
                      : "SB A320-57-1118 R3 Compliance"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Remarks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="text-slate-700">
                {adId === "1"
                  ? "Not applicable - MOD 24591 embodied"
                  : adId === "2"
                    ? "Open - Inspection due before 15 March 2016"
                    : "Repetitive - Inspection cycle established per SB requirements"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Content - Compliance Dashboard */}
        <div className="space-y-6">
          {/* AD Subject - Compliance Tracking Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50">
                      <th
                        colSpan={3}
                        className="border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-900"
                      >
                        Last Compliance
                      </th>
                      <th
                        colSpan={3}
                        className="border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-900"
                      >
                        Interval
                      </th>
                      <th
                        colSpan={3}
                        className="border border-slate-300 px-4 py-3 text-center text-sm font-semibold text-slate-900"
                      >
                        Threshold / Next Due
                      </th>
                    </tr>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        Date
                      </th>
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        FH
                      </th>
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        FC
                      </th>
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        Days
                      </th>
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        FH
                      </th>
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        FC
                      </th>
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        Date
                      </th>
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        FH
                      </th>
                      <th className="border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
                        FC
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                      <td className="border border-slate-300 px-4 py-3 text-center text-sm text-slate-600"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Reference Documents */}
          {adData.referenceDoc && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Reference Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {adData.referenceDoc.split("\n").map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <span className="font-mono text-slate-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Compliance Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Graph</CardTitle>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5 text-blue-600" />
                  <span>AI Check</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-600" />
                  <span>Manual Verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Final Approval</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {documentNodes.map((doc) => {
                const status = getDocumentStatus(doc.checks)
                const colors = getStatusColors(status)

                return (
                  <div key={doc.id} className="space-y-3">
                    {/* Document Header */}
                    <div
                      className="flex items-center justify-between rounded-lg border-2 p-3"
                      style={{
                        borderColor: colors.borderColor,
                        backgroundColor: colors.backgroundColor,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                          <FileText className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{doc.fullName}</div>
                          <div className="text-xs text-slate-600">{doc.name}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={colors.badgeClass}>{colors.label}</Badge>
                        {colors.icon}
                      </div>
                    </div>

                    {/* Checks List */}
                    <div className="ml-4 space-y-2 border-l-2 border-slate-200 pl-4">
                      {doc.checks.map((check, idx) => {
                        const checkStatusColors = getStatusColors(check.status)
                        return (
                          <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <div className="font-medium text-slate-900">{check.name}</div>
                                {check.manualVerified && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                              </div>
                              <div className="mt-1 text-xs text-slate-500">{check.details}</div>
                              <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                                <span>
                                  {check.type === "AI" ? "🤖" : "👤"} {check.performedBy}
                                </span>
                                <span>{check.timestamp}</span>
                                {check.manualVerified && check.manualVerifiedBy && (
                                  <span className="text-emerald-600">✓ Verified by {check.manualVerifiedBy}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  check.status === "pass"
                                    ? "bg-emerald-600"
                                    : check.status === "failed"
                                      ? "bg-rose-600"
                                      : "bg-amber-600"
                                }
                              >
                                {check.status === "pass" ? "Pass" : check.status === "failed" ? "Failed" : "Pending"}
                              </Badge>
                              {!check.manualVerified && check.status === "pass" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 bg-transparent"
                                  onClick={() => handleDigitalSignature(check.name)}
                                >
                                  <PenTool className="mr-1 h-3 w-3" />
                                  Verify
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0"
                                onClick={() => handleDocumentPreview(doc.name)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
