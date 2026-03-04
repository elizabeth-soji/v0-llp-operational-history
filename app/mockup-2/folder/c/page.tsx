import Link from "next/link"
import { ArrowLeft, Download, Clock, FileText, Upload, Plus, ChevronRight, Folder, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function FolderCPage() {
  const folderInfo = {
    letter: "C",
    name: "Aircraft Maintenance Records",
    progress: 45,
    status: "in-progress",
    documents: 14,
  }

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
                  <div className="h-16 w-16 rounded-lg bg-violet-50 border-2 border-violet-200 flex items-center justify-center">
                    <span className="text-3xl font-bold text-violet-600">{folderInfo.letter}</span>
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
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Maintenance Record Documents</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      code: "C 001",
                      name: "Aircraft Technical Logs",
                      progress: 90,
                      documents: 1,
                      lastUpdate: "2 hours ago",
                      assignee: "Sarah C.",
                      party: "CAMO",
                    },
                    {
                      code: "C 002",
                      name: "A Checks",
                      progress: 75,
                      documents: 1,
                      lastUpdate: "1 day ago",
                      assignee: "Mike J.",
                      party: "MRO",
                    },
                    {
                      code: "C 003",
                      name: "C Checks",
                      progress: 60,
                      documents: 1,
                      lastUpdate: "3 hours ago",
                      assignee: "Emily R.",
                      party: "MRO",
                    },
                    {
                      code: "C 004",
                      name: "All Major Airframe scheduled Structural Check Packages",
                      progress: 45,
                      documents: 1,
                      lastUpdate: "5 hours ago",
                      assignee: "David K.",
                      party: "MRO",
                    },
                    {
                      code: "C 005",
                      name: "CPCP/ISIP certified maintenance task cards",
                      progress: 30,
                      documents: 1,
                      lastUpdate: "1 day ago",
                      assignee: "Lisa M.",
                      party: "CAMO",
                    },
                    {
                      code: "C 006",
                      name: "File for each applicable Airframe and Appliance (Component) AD",
                      progress: 20,
                      documents: 1,
                      lastUpdate: "2 days ago",
                      assignee: "James T.",
                      party: "CAMO",
                      link: "/mockup-2/folder/c/subfolder/c006",
                    },
                    {
                      code: "C 007",
                      name: "File for each incorporated Manufacturer's Service Bulletin",
                      progress: 40,
                      documents: 1,
                      lastUpdate: "6 hours ago",
                      assignee: "Anna P.",
                      party: "MRO",
                    },
                    {
                      code: "C 008",
                      name: "File for each incorporated non-OEM modification (including STCs)",
                      progress: 55,
                      documents: 1,
                      lastUpdate: "4 hours ago",
                      assignee: "Robert L.",
                      party: "Lessor",
                    },
                    {
                      code: "C 009",
                      name: "Certified maintenance data for each Structural Repair and Allowable Damage",
                      progress: 35,
                      documents: 1,
                      lastUpdate: "8 hours ago",
                      assignee: "Maria S.",
                      party: "MRO",
                    },
                    {
                      code: "C 010",
                      name: "Aircraft weight report reflecting current configuration",
                      progress: 80,
                      documents: 1,
                      lastUpdate: "3 hours ago",
                      assignee: "John D.",
                      party: "CAMO",
                    },
                    {
                      code: "C 011",
                      name: "Flight control balance status",
                      progress: 70,
                      documents: 1,
                      lastUpdate: "5 hours ago",
                      assignee: "Patricia W.",
                      party: "MRO",
                    },
                    {
                      code: "C 012",
                      name: "Last Demonstration Flight report and relevant Technical Log",
                      progress: 25,
                      documents: 1,
                      lastUpdate: "1 day ago",
                      assignee: "Michael B.",
                      party: "Operator",
                    },
                    {
                      code: "C 013",
                      name: "Compass Deviation report including certified task card",
                      progress: 50,
                      documents: 1,
                      lastUpdate: "7 hours ago",
                      assignee: "Jennifer H.",
                      party: "MRO",
                    },
                    {
                      code: "C 014",
                      name: "Current Hard Copy records inventory",
                      progress: 65,
                      documents: 1,
                      lastUpdate: "4 hours ago",
                      assignee: "Thomas G.",
                      party: "CAMO",
                    },
                  ].map((subfolder) => (
                    <Card key={subfolder.code} className="hover:shadow-md transition-all bg-white border-slate-200">
                      {subfolder.link ? (
                        <Link href={subfolder.link} className="block">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0">
                                  <FileText className="h-6 w-6 text-violet-600" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-violet-600 mb-1">{subfolder.code}</div>
                                  <CardTitle className="text-sm text-slate-900 leading-tight">
                                    {subfolder.name}
                                  </CardTitle>
                                  <div className="text-xs text-slate-500 mt-1">{subfolder.documents} document</div>
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
                                <span className="font-semibold text-violet-600">{subfolder.party}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Link>
                      ) : (
                        <>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0">
                                  <FileText className="h-6 w-6 text-violet-600" />
                                </div>
                                <div>
                                  <div className="text-xs font-semibold text-violet-600 mb-1">{subfolder.code}</div>
                                  <CardTitle className="text-sm text-slate-900 leading-tight">
                                    {subfolder.name}
                                  </CardTitle>
                                  <div className="text-xs text-slate-500 mt-1">{subfolder.documents} document</div>
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
                                <span className="font-semibold text-violet-600">{subfolder.party}</span>
                              </div>
                            </div>
                          </CardContent>
                        </>
                      )}
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
