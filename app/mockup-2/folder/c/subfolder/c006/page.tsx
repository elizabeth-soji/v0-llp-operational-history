"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronLeft, Download, Upload, Folder, FileText, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function C006ADPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompliances, setSelectedCompliances] = useState<string[]>([])
  const [selectedAIFindings, setSelectedAIFindings] = useState<string[]>([])

  const airworthinessDirectives = [
    {
      id: "1",
      easaAd: "2016-0015",
      faaAd: "",
      supersedes: "2015-0245",
      subject: "ATA 53 – FUSELAGE – Door Stop Fitting Holes – Inspection / Repair",
      effectiveDate: "29 January 2016",
      referenceDoc: "",
      compliance: "Superseded",
      aiFindings: "Yes", // Added AI Findings field
    },
    {
      id: "2",
      easaAd: "2012-0175R2",
      faaAd: "2013-17-09",
      supersedes: "",
      subject:
        "ATA 27 - FLIGHT CONTROLS-Trimmable Horizontal Stabilizer Actuator ball screw Lower Splines - Inspection / Replacement",
      effectiveDate: "4 February 2016",
      referenceDoc: "SB A320-27-1214\nGOODRICH ACTUATION SYSTEMS SB 47145-27-16",
      compliance: "Open",
      aiFindings: "Yes", // Added AI Findings field
    },
    {
      id: "3",
      easaAd: "2012-0032R1",
      faaAd: "",
      supersedes: "2011-0089",
      subject: "ATA 57 - WINGS – Outer Wing Main Landing Gear Support Rib 5 Fitting – Inspection / Modification",
      effectiveDate: "8 December 2015",
      referenceDoc: "SB A320-57-1118 R3\nSB A320-57-1138 R1\nSB A320-57A1166 R1",
      compliance: "Repetitive",
      aiFindings: "No", // Added AI Findings field
    },
    {
      id: "4",
      easaAd: "US-2015-15-12",
      faaAd: "2015-15-12",
      supersedes: "",
      subject: "ATA 34 - NAVIGATION-In-Flight Entertainment System Radome Assembly",
      effectiveDate: "8 September 2015",
      referenceDoc: "SB A320-53-006R1",
      compliance: "Not Applicable",
      aiFindings: "No", // Added AI Findings field
    },
    {
      id: "5",
      easaAd: "2015-0205",
      faaAd: "2015-15-12",
      supersedes: "",
      subject: "ATA 34 - NAVIGATION - Airspeed Pilot Probes - Replacement",
      effectiveDate: "23 October 2015",
      referenceDoc: "SB A320-34-1170 REV.30",
      compliance: "Closed",
      aiFindings: "Yes", // Added AI Findings field
    },
  ]

  const filteredDirectives = airworthinessDirectives.filter((ad) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      ad.easaAd.toLowerCase().includes(query) ||
      ad.faaAd.toLowerCase().includes(query) ||
      ad.supersedes.toLowerCase().includes(query) ||
      ad.subject.toLowerCase().includes(query) ||
      ad.referenceDoc.toLowerCase().includes(query) ||
      ad.compliance.toLowerCase().includes(query) ||
      ad.aiFindings.toLowerCase().includes(query)

    const matchesCompliance = selectedCompliances.length === 0 || selectedCompliances.includes(ad.compliance)
    const matchesAIFindings = selectedAIFindings.length === 0 || selectedAIFindings.includes(ad.aiFindings)

    return matchesSearch && matchesCompliance && matchesAIFindings
  })

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

  const toggleCompliance = (compliance: string) => {
    setSelectedCompliances((prev) =>
      prev.includes(compliance) ? prev.filter((c) => c !== compliance) : [...prev, compliance],
    )
  }

  const toggleAIFinding = (finding: string) => {
    setSelectedAIFindings((prev) => (prev.includes(finding) ? prev.filter((f) => f !== finding) : [...prev, finding]))
  }

  const complianceOptions = [
    { label: "Open", value: "Open" },
    { label: "Repetitive", value: "Repetitive" },
    { label: "Closed", value: "Closed" },
    { label: "Superseded", value: "Superseded" },
    { label: "Not Applicable", value: "Not Applicable" },
  ]

  const aiFindingsOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/mockup-2/folder/c">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Aircraft Maintenance Records
              </Button>
            </Link>
            <div className="text-sm text-slate-500">
              IATA Binder / C. Aircraft Maintenance Records / C006. Airframe and Appliance ADs
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
              Export AD Report
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

      {/* Main Content */}
      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Airframe and Appliance Airworthiness Directives</CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  File for each applicable Airframe and Appliance (Component) AD
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                  <FileText className="h-3 w-3 mr-1" />
                  {filteredDirectives.length} ADs
                </Badge>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by EASA AD, FAA AD, Subject, Reference Doc, Compliance, or AI Findings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Filter by Compliance
                    {selectedCompliances.length > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                        {selectedCompliances.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {complianceOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={selectedCompliances.includes(option.value)}
                      onCheckedChange={() => toggleCompliance(option.value)}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {selectedCompliances.length > 0 && (
                    <>
                      <div className="border-t my-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCompliances([])}
                        className="w-full justify-start text-slate-500 h-8"
                      >
                        Clear filters
                      </Button>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    AI Findings
                    {selectedAIFindings.length > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 px-1.5">
                        {selectedAIFindings.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {aiFindingsOptions.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={selectedAIFindings.includes(option.value)}
                      onCheckedChange={() => toggleAIFinding(option.value)}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {selectedAIFindings.length > 0 && (
                    <>
                      <div className="border-t my-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAIFindings([])}
                        className="w-full justify-start text-slate-500 h-8"
                      >
                        Clear filters
                      </Button>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">EASA AD</th>
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">FAA AD</th>
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Supersedes AD</th>
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Subject</th>
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Effective Date</th>
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Reference Doc</th>
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">Compliance</th>
                    <th className="text-left p-3 font-semibold text-slate-900 bg-slate-50">AI Findings</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDirectives.map((ad, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                      onClick={() => (window.location.href = `/mockup-2/folder/c/subfolder/c006/ad/${ad.id}`)}
                    >
                      <td className="p-3 font-mono text-slate-900">{ad.easaAd}</td>
                      <td className="p-3 font-mono text-slate-900">{ad.faaAd || "—"}</td>
                      <td className="p-3 font-mono text-slate-600">
                        {ad.compliance === "Superseded" ? ad.supersedes || "—" : "—"}
                      </td>
                      <td className="p-3 text-slate-700">{ad.subject}</td>
                      <td className="p-3 text-slate-700 whitespace-nowrap">{ad.effectiveDate}</td>
                      <td className="p-3 text-slate-700 whitespace-pre-line text-xs">{ad.referenceDoc || "—"}</td>
                      <td className="p-3">
                        <Badge variant="outline" className={getComplianceBadgeClass(ad.compliance)}>
                          {ad.compliance}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-semibold ${ad.aiFindings === "Yes" ? "text-red-700" : "text-slate-500"}`}
                        >
                          {ad.aiFindings}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredDirectives.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-500">
                        No airworthiness directives found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
