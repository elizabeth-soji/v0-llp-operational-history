import Link from "next/link"
import { ArrowLeft, Download, Clock, FileText, Settings2, Upload, Plus, FolderOpen, ChevronRight, Folder } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function FolderPage() {
  // This would come from the route params in a real app
  const folderInfo = {
    letter: "H",
    name: "Component Records",
    progress: 40,
    status: "in-progress",
    documents: 22,
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

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Basic Info */}
          <div className="col-span-3 space-y-3">
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">CURRENT DATE:</div>
              <div className="font-semibold text-slate-900">24-Oct-25</div>
            </div>
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">AIRCRAFT TYPE:</div>
              <div className="font-semibold text-slate-900">A321</div>
            </div>
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">TYPE OF AUDIT:</div>
              <div className="font-semibold text-slate-900">Transition</div>
            </div>
          </div>

          {/* Middle Left Column */}
          <div className="col-span-3 space-y-3">
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">MSN:</div>
              <div className="font-semibold text-slate-900">7382</div>
            </div>
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">REGISTRATION:</div>
              <div className="font-semibold text-slate-900">JA112A</div>
            </div>
            <div className="bg-slate-100 rounded-lg p-3 flex gap-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">A/C Hours:</div>
                <div className="font-mono font-semibold text-slate-900">16,635:51</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">A/C Cycles:</div>
                <div className="font-mono font-semibold text-slate-900">14,538</div>
              </div>
            </div>
          </div>

          {/* Middle Right Column - Milestones */}
          <div className="col-span-3 space-y-3">
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">MPA RUN:</div>
              <div className="font-semibold text-slate-900">-</div>
            </div>
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">DEMO FLIGHT:</div>
              <div className="font-semibold text-slate-900">-</div>
            </div>
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">BSI:</div>
              <div className="font-semibold text-slate-900">-</div>
            </div>
          </div>

          {/* Right Column - Components Table */}
          <div className="col-span-3">
            <div className="bg-white border border-slate-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-slate-900 mb-2">Components</div>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-600 pb-1 border-b border-slate-200">
                  <div>Component</div>
                  <div className="text-right">TSN</div>
                  <div className="text-right">CSN</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-slate-700">ENG #1:</div>
                  <div className="text-right font-mono text-slate-900">16,635:51</div>
                  <div className="text-right font-mono text-slate-900">14,538</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-slate-700">ENG #2:</div>
                  <div className="text-right font-mono text-slate-900">15,486:48</div>
                  <div className="text-right font-mono text-slate-900">13,691</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-slate-700">APU:</div>
                  <div className="text-right font-mono text-slate-900">14,657:00</div>
                  <div className="text-right font-mono text-slate-900">17,864</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-slate-700">NLG:</div>
                  <div className="text-right font-mono text-slate-900">16,635:51</div>
                  <div className="text-right font-mono text-slate-900">14,538</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-slate-700">LHMLG:</div>
                  <div className="text-right font-mono text-slate-900">16,635:51</div>
                  <div className="text-right font-mono text-slate-900">14,538</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-slate-700">RHMLG:</div>
                  <div className="text-right font-mono text-slate-900">16,635:51</div>
                  <div className="text-right font-mono text-slate-900">14,538</div>
                </div>
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
                  <div className="h-16 w-16 rounded-lg bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">{folderInfo.letter}</span>
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
                  Create Subfolder
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
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Subfolders</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      code: "H001",
                      name: "Hard Time Components",
                      progress: 55,
                      status: "in-progress",
                      assignee: "MRO Team",
                      priority: "high",
                      documents: 12,
                      lastUpdate: "20 min ago",
                    },
                    {
                      code: "H002",
                      name: "OC/CM Components",
                      progress: 25,
                      status: "in-progress",
                      assignee: "CAMO Team",
                      priority: "high",
                      documents: 10,
                      lastUpdate: "1 hour ago",
                    },
                  ].map((subfolder) => (
                    <Link key={subfolder.code} href={`/mockup-2/folder/H/subfolder/${subfolder.code}`}>
                      <Card className="hover:shadow-md transition-all cursor-pointer group relative overflow-hidden bg-white border-slate-200">
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 ${
                            subfolder.priority === "high"
                              ? "bg-red-500"
                              : subfolder.priority === "medium"
                                ? "bg-amber-500"
                                : "bg-blue-500"
                          }`}
                        />

                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                                <FolderOpen className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-blue-600 mb-1">{subfolder.code}</div>
                                <CardTitle className="text-base text-slate-900">{subfolder.name}</CardTitle>
                                <div className="text-xs text-slate-500 mt-1">{subfolder.documents} documents</div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-slate-900"
                            >
                              <Settings2 className="h-4 w-4" />
                            </Button>
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

                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200">
                              <Clock className="h-3 w-3 mr-1" />
                              In Progress
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs border ${
                                subfolder.priority === "high"
                                  ? "border-red-200 text-red-700 bg-red-50"
                                  : subfolder.priority === "medium"
                                    ? "border-amber-200 text-amber-700 bg-amber-50"
                                    : "border-slate-200 text-slate-600 bg-slate-50"
                              }`}
                            >
                              {subfolder.priority}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-medium text-blue-600">
                                {subfolder.assignee
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className="text-xs font-medium text-slate-700">{subfolder.assignee}</span>
                            </div>
                            <span className="text-xs text-slate-500">{subfolder.lastUpdate}</span>
                          </div>

                          <div className="pt-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
