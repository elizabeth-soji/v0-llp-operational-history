import Link from "next/link"
import { ArrowLeft, Download, Clock, FileText, Upload, Plus, ChevronRight, Folder, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function FolderGPage() {
  const folderInfo = {
    letter: "G",
    name: "APU",
    progress: 78,
    status: "in-progress",
    documents: 8,
  }

  const subfolders = [
    {
      code: "G 001",
      name: "(i) Certified Total Time in Service of APU (including current Hours and Cycles) (ii) Certified statement of ratio between Aircraft Hours to APU Hours)",
      progress: 100,
      documents: 2,
      lastUpdate: "1 day ago",
      assignee: "Sarah C.",
      party: "CAMO",
    },
    {
      code: "G 002",
      name: "Certified Status of APU Airworthiness Directives (including applicability status and statement as to method of compliance e.g. modified/repaired/inspected)",
      progress: 85,
      documents: 1,
      lastUpdate: "2 hours ago",
      assignee: "Mike J.",
      party: "MRO",
    },
    {
      code: "G 003",
      name: "Certified status of incorporated APU Manufacture Service Bulletins",
      progress: 90,
      documents: 1,
      lastUpdate: "3 hours ago",
      assignee: "Emily R.",
      party: "CAMO",
    },
    {
      code: "G 004",
      name: "APU Log Book and/or Master record of Installation & Removals (as applicable)",
      progress: 75,
      documents: 1,
      lastUpdate: "4 hours ago",
      assignee: "David K.",
      party: "Operator",
    },
    {
      code: "G 005",
      name: "All APU Shop Visit Reports back to last Heavy SV, and if available Shop Visit Reports prior to last Heavy SV (SV Reports may not include engine DFP records and shop task cards)",
      progress: 70,
      documents: 1,
      lastUpdate: "5 hours ago",
      assignee: "Lisa M.",
      party: "MRO",
    },
    {
      code: "G 006",
      name: "Certified Life Limited Parts Listing indicating hour or cycle limit, hours or cycles consumed since new, and hours or cycles remaining, and if applicable the individual total hour or cycle substantiation record for each Life Limited Part since manufacture",
      progress: 80,
      documents: 1,
      lastUpdate: "6 hours ago",
      assignee: "James T.",
      party: "CAMO",
    },
    {
      code: "G 007",
      name: "Operational Performance Test (on-wing) - certified maintenance task card (if applicable)",
      progress: 65,
      documents: 1,
      lastUpdate: "1 day ago",
      assignee: "Anna P.",
      party: "Lessor",
    },
    {
      code: "G 008",
      name: "Last Borescope report (including video), if required by lease",
      progress: 75,
      documents: 1,
      lastUpdate: "1 day ago",
      assignee: "Tom W.",
      party: "MRO",
    },
  ]

  return (
    <div className="flex flex-col bg-white min-h-screen">
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
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-xs text-slate-500 mb-1">MSN</div>
              <div className="font-mono font-semibold text-slate-900">7382</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Registry</div>
              <div className="font-mono font-semibold text-slate-900">JA112A</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Delivery</div>
              <div className="font-semibold text-slate-900">25/11/2025</div>
            </div>
            <div>
              <div className="font-semibold text-blue-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                T-31 days
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {/* Center Column - Subfolder View */}
          <div className="bg-white">
            <div className="p-6">
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                <Link href="/mockup-2" className="hover:text-slate-900 transition-colors">
                  IATA Binder
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="font-semibold text-slate-900">
                  {folderInfo.letter}. {folderInfo.name}
                </span>
              </div>

              {/* Folder Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center">
                    <span className="text-3xl font-bold text-indigo-600">{folderInfo.letter}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{folderInfo.name}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">
                        <Clock className="h-3 w-3 mr-1" />
                        In Progress
                      </Badge>
                      <span className="text-sm text-slate-600">{folderInfo.documents} total documents</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Overall Progress</span>
                  <span className="text-sm font-semibold text-slate-900">{folderInfo.progress}%</span>
                </div>
                <Progress value={folderInfo.progress} className="h-3" />
              </div>

              {/* Subfolders Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">APU Records</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {subfolders.map((subfolder) => (
                    <Card key={subfolder.code} className="hover:shadow-md transition-all bg-white border-slate-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center flex-shrink-0">
                              <FileText className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-indigo-600 mb-1">{subfolder.code}</div>
                              <CardTitle className="text-sm text-slate-900 leading-tight">{subfolder.name}</CardTitle>
                              <div className="text-xs text-slate-500 mt-1">
                                {subfolder.documents} document{subfolder.documents > 1 ? "s" : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-slate-600">Progress</span>
                            <span className="text-xs font-semibold text-slate-900">{subfolder.progress}%</span>
                          </div>
                          <Progress value={subfolder.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                          <span className="text-xs text-slate-500">Updated {subfolder.lastUpdate}</span>
                          <div className="flex items-center gap-1 text-xs text-slate-600">
                            <User className="h-3 w-3" />
                            <span>{subfolder.assignee}</span>
                            <span className="text-slate-400">•</span>
                            <span className="font-semibold text-indigo-600">{subfolder.party}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
