"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Download,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Clock,
  CheckCircle2,
  Calendar,
  Upload,
  FolderOpen,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Notifications } from "@/components/notifications"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Mockup2() {
  const [isIATABinderOpen, setIsIATABinderOpen] = useState(true)
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null)
  const [isEditActivityOpen, setIsEditActivityOpen] = useState(false)
  const [isAssignFolderOpen, setIsAssignFolderOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const [projectDates, setProjectDates] = useState({
    mpaRun: "",
    demoFlight: "",
    bsi: "",
    techAcceptDate: "",
    ferryFlight: "",
  })

  const [activities, setActivities] = useState([
    {
      id: 1,
      party: "Lessor",
      name: "Initial Review",
      status: "COMPLETED",
      startDate: "Oct 1",
      endDate: "Oct 15",
      priority: "HIGH",
      assignee: "Mike J.",
    },
    {
      id: 2,
      party: "Lessor",
      name: "Docs Review",
      status: "IN PROGRESS",
      startDate: "Nov 5",
      endDate: "Dec 10",
      priority: "MED",
      assignee: "Sarah C.",
    },
    {
      id: 3,
      party: "Lessor",
      name: "Approval",
      status: "PENDING",
      startDate: "Dec 15",
      endDate: "Dec 25",
      priority: "HIGH",
      assignee: "Lisa W.",
    },
    {
      id: 4,
      party: "Lessor",
      name: "Concessions",
      status: "PENDING",
      startDate: "Jan 10",
      endDate: "Feb 15",
      priority: "MED",
      assignee: "Alex K.",
    },
    {
      id: 5,
      party: "CAMO",
      name: "AMF Bridge",
      status: "IN PROGRESS",
      startDate: "Oct 1",
      endDate: "Nov 20",
      priority: "HIGH",
      assignee: "Emily R.",
    },
    {
      id: 6,
      party: "CAMO",
      name: "Tech Spec",
      status: "COMPLETED",
      startDate: "Nov 1",
      endDate: "Nov 15",
      priority: "LOW",
      assignee: "David L.",
    },
    {
      id: 7,
      party: "CAMO",
      name: "AD Close",
      status: "IN PROGRESS",
      startDate: "Dec 1",
      endDate: "Dec 20",
      priority: "HIGH",
      assignee: "Sarah C.",
    },
    {
      id: 8,
      party: "CAMO",
      name: "Final Audit",
      status: "PENDING",
      startDate: "Feb 1",
      endDate: "Feb 25",
      priority: "MED",
      assignee: "Mike J.",
    },
    {
      id: 9,
      party: "MRO",
      name: "C-Check Prep",
      status: "IN PROGRESS",
      startDate: "Oct 10",
      endDate: "Nov 15",
      priority: "HIGH",
      assignee: "James M.",
    },
    {
      id: 10,
      party: "MRO",
      name: "Borescopes",
      status: "COMPLETED",
      startDate: "Oct 25",
      endDate: "Nov 10",
      priority: "MED",
      assignee: "Tom S.",
    },
    {
      id: 11,
      party: "MRO",
      name: "NAC Docs",
      status: "IN PROGRESS",
      startDate: "Nov 20",
      endDate: "Dec 15",
      priority: "HIGH",
      assignee: "Lisa W.",
    },
    {
      id: 12,
      party: "MRO",
      name: "Testing",
      status: "ON HOLD",
      startDate: "Dec 20",
      endDate: "Jan 5",
      priority: "MED",
      assignee: "Alex K.",
    },
    {
      id: 13,
      party: "MRO",
      name: "Test Docs",
      status: "PENDING",
      startDate: "Feb 1",
      endDate: "Feb 28",
      priority: "LOW",
      assignee: "Emily R.",
    },
  ])

  const updateActivityStatus = (activityId: number, newStatus: string) => {
    setActivities((prev) =>
      prev.map((activity) => (activity.id === activityId ? { ...activity, status: newStatus } : activity)),
    )
  }

  const handleActivityClick = (activityId: number) => {
    setSelectedActivity(activityId)
    setIsEditActivityOpen(true)
  }

  const [folderAssignments, setFolderAssignments] = useState<
    Record<string, { assignee: string; party: string; priority: string }>
  >({
    A: { assignee: "Sarah Chen", party: "CAMO", priority: "medium" },
    B: { assignee: "Mike Johnson", party: "MRO", priority: "high" },
    C: { assignee: "Emily Rodriguez", party: "CAMO", priority: "high" },
    D: { assignee: "Alex Kumar", party: "Operator", priority: "medium" },
    E: { assignee: "Lisa Wong", party: "Lessor", priority: "medium" },
    F: { assignee: "James Miller", party: "MRO", priority: "high" },
    G: { assignee: "Tom Stevens", party: "MRO", priority: "medium" },
    H: { assignee: "David Lee", party: "MRO", priority: "high" },
    I: { assignee: "Sarah Chen", party: "Operator", priority: "medium" },
    J: { assignee: "Alex Kumar", party: "Operator", priority: "low" },
    K: { assignee: "Mike Johnson", party: "MRO", priority: "medium" },
  })

  const handleAssignFolder = (folderLetter: string) => {
    setSelectedFolder(folderLetter)
    setIsAssignFolderOpen(true)
  }

  const currentActivity = selectedActivity ? activities.find((a) => a.id === selectedActivity) : null

  // Placeholder for folders data structure
  const folders = [
    {
      letter: "A",
      name: "Current Certificates",
      progress: 85,
      documents: 7,
      lastUpdate: "2 days ago",
      color: "blue",
      link: "/mockup-2/folder/a",
    },
    {
      letter: "B",
      name: "Aircraft Maintenance Status Summaries",
      progress: 72,
      documents: 38,
      lastUpdate: "1 hour ago",
      color: "emerald",
      link: "/mockup-2/folder/b",
    },
    {
      letter: "C",
      name: "Aircraft Maintenance Records",
      progress: 45,
      documents: 15,
      lastUpdate: "30 min ago",
      color: "violet",
      link: "/mockup-2/folder/c",
    },
    {
      letter: "D",
      name: "Configuration Status",
      progress: 90,
      documents: 42,
      lastUpdate: "5 hours ago",
      color: "amber",
      link: "/mockup-2/folder/d",
    },
    {
      letter: "E",
      name: "Aircraft Manufacturer Records",
      progress: 65,
      documents: 20,
      lastUpdate: "3 hours ago",
      color: "rose",
      link: "/mockup-2/folder/e",
    },
    {
      letter: "F1",
      name: "Engine Records 1",
      progress: 98,
      documents: 27,
      lastUpdate: "1 hour ago",
      color: "cyan",
      link: "/mockup-2/folder/f1",
    },
    {
      letter: "F2",
      name: "Engine Records 2",
      progress: 50,
      documents: 25,
      lastUpdate: "1 hour ago",
      color: "cyan",
      link: "/mockup-2/folder/f2",
    },
    {
      letter: "G",
      name: "APU",
      progress: 78,
      documents: 31,
      lastUpdate: "4 hours ago",
      color: "indigo",
      link: "/mockup-2/folder/g",
    },
    {
      letter: "H",
      name: "Component Records",
      progress: 40,
      documents: 22,
      lastUpdate: "20 min ago",
      color: "teal",
      link: "/mockup-2/folder/h",
    },
    {
      letter: "I1",
      name: "Landing Gear 1",
      progress: 50,
      documents: 19,
      lastUpdate: "2 hours ago",
      color: "orange",
      link: "/mockup-2/folder/i",
    },
    {
      letter: "I2",
      name: "Landing Gear 2",
      progress: 45,
      documents: 18,
      lastUpdate: "2 hours ago",
      color: "orange",
      link: "/mockup-2/folder/i",
    },
    {
      letter: "J",
      name: "Manuals",
      progress: 95,
      documents: 19, // Updated document count from 12 to 19
      lastUpdate: "1 day ago",
      color: "green",
      link: "/mockup-2/folder/j", // Added link to Folder J page
    },
    {
      letter: "K1",
      name: "Propeller 1",
      progress: 68,
      documents: 16,
      lastUpdate: "6 hours ago",
      color: "pink",
      link: "/mockup-2/folder/k", // added link to Folder K page
    },
    {
      letter: "K2",
      name: "Propeller 2",
      progress: 60,
      documents: 14,
      lastUpdate: "3 hours ago",
      color: "pink",
      link: "/mockup-2/folder/k", // added link to Folder K page
    },
  ]

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="h-6 w-px bg-slate-200" />
          <h1 className="text-xl font-bold text-slate-900">EFW A321-200 P2F Redelivery</h1>
        </div>
        <div className="flex items-center gap-2">
          <Notifications />
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
            <FolderOpen className="h-4 w-4 mr-2" />
            AI Record Management System
          </Button>
          {/* CHANGE: Added Link to navigate to upload page */}
          <Link href="/mockup-2/upload">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </Link>
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
              <Input
                type="text"
                value={projectDates.mpaRun}
                onChange={(e) => setProjectDates((prev) => ({ ...prev, mpaRun: e.target.value }))}
                placeholder="Enter date"
                className="h-7 text-sm font-semibold bg-white border-slate-300"
              />
            </div>
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">DEMO FLIGHT:</div>
              <Input
                type="text"
                value={projectDates.demoFlight}
                onChange={(e) => setProjectDates((prev) => ({ ...prev, demoFlight: e.target.value }))}
                placeholder="Enter date"
                className="h-7 text-sm font-semibold bg-white border-slate-300"
              />
            </div>
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">BSI:</div>
              <Input
                type="text"
                value={projectDates.bsi}
                onChange={(e) => setProjectDates((prev) => ({ ...prev, bsi: e.target.value }))}
                placeholder="Enter date"
                className="h-7 text-sm font-semibold bg-white border-slate-300"
              />
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

        <div className="grid grid-cols-3 gap-4 mt-3">
          <div className="bg-slate-100 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">FERRY FLIGHT:</div>
            <Input
              type="text"
              value={projectDates.ferryFlight}
              onChange={(e) => setProjectDates((prev) => ({ ...prev, ferryFlight: e.target.value }))}
              placeholder="Enter date"
              className="h-7 text-sm font-semibold bg-white border-slate-300"
            />
          </div>
          <div className="bg-slate-100 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">TECH ACCEPT DATE:</div>
            <Input
              type="text"
              value={projectDates.techAcceptDate}
              onChange={(e) => setProjectDates((prev) => ({ ...prev, techAcceptDate: e.target.value }))}
              placeholder="Enter date"
              className="h-7 text-sm font-semibold bg-white border-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[320px_1fr_384px] gap-0">
        {/* Left Column - Maintenance Planning */}
        <div className="border-r border-slate-200 bg-slate-50">
          <div className="h-14 border-b border-slate-200 px-4 flex items-center justify-between sticky top-16 bg-slate-50 z-10">
            <h2 className="font-semibold text-slate-900">Maintenance Planning</h2>
          </div>
          <div className="p-3 space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
            {[
              {
                number: "WO-2025-001",
                name: "C-Check",
                status: "in-progress",
                startDate: "10-Oct-25",
                completionDate: "20-Nov-25",
                assignedTo: "MRO Team",
                progress: 65,
              },
              {
                number: "WO-2025-002",
                name: "Engine Change #1",
                status: "completed",
                startDate: "01-Sep-25",
                completionDate: "15-Sep-25",
                assignedTo: "Engine Shop",
                progress: 100,
              },
              {
                number: "WO-2025-003",
                name: "Landing Gear Overhaul",
                status: "in-progress",
                startDate: "15-Oct-25",
                completionDate: "10-Nov-25",
                assignedTo: "MRO Team",
                progress: 45,
              },
              {
                number: "WO-2025-004",
                name: "APU Inspection",
                status: "scheduled",
                startDate: "01-Nov-25",
                completionDate: "05-Nov-25",
                assignedTo: "APU Specialist",
                progress: 0,
              },
              {
                number: "WO-2025-005",
                name: "Cabin Modification",
                status: "in-progress",
                startDate: "20-Oct-25",
                completionDate: "15-Nov-25",
                assignedTo: "Cabin Team",
                progress: 30,
              },
            ].map((wo, idx) => (
              <Card key={idx} className="bg-white border-slate-200 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-3 space-y-3">
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-mono text-xs text-slate-600">{wo.number}</div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          wo.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : wo.status === "in-progress"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {wo.status === "completed" ? (
                          <>
                            <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                            Completed
                          </>
                        ) : wo.status === "in-progress" ? (
                          <>
                            <Clock className="h-2.5 w-2.5 mr-0.5" />
                            In Progress
                          </>
                        ) : (
                          <>
                            <Calendar className="h-2.5 w-2.5 mr-0.5" />
                            Scheduled
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mb-2">{wo.name}</div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Start:</span>
                      <span className="text-slate-900 font-medium">{wo.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Complete:</span>
                      <span className="text-slate-900 font-medium">{wo.completionDate}</span>
                    </div>
                  </div>

                  <div>
                    <Badge variant="outline" className="text-[10px] border-slate-300 text-slate-600">
                      {wo.assignedTo}
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">Progress</span>
                      <span className="text-xs font-semibold text-slate-900">{wo.progress}%</span>
                    </div>
                    <Progress value={wo.progress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Center Column - Project Timeline & IATA Binder */}
        <div className="bg-white">
          <div className="p-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Project Timeline
                </h2>
                <div className="flex items-center gap-2">
                  <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Activity
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Activity</DialogTitle>
                        <DialogDescription>Create a new activity for the project timeline.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="activity-name">Activity Name</Label>
                          <Input id="activity-name" placeholder="e.g., Document Review" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="responsible-party">Responsible Party</Label>
                          <Select>
                            <SelectTrigger id="responsible-party">
                              <SelectValue placeholder="Select party" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lessor">Lessor</SelectItem>
                              <SelectItem value="camo">CAMO</SelectItem>
                              <SelectItem value="mro">MRO</SelectItem>
                              <SelectItem value="operator">Operator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="responsible-person">Responsible Person</Label>
                          <Select>
                            <SelectTrigger id="responsible-person">
                              <SelectValue placeholder="Select person" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sarah">Sarah Chen</SelectItem>
                              <SelectItem value="mike">Mike Johnson</SelectItem>
                              <SelectItem value="emily">Emily Rodriguez</SelectItem>
                              <SelectItem value="alex">Alex Kumar</SelectItem>
                              <SelectItem value="lisa">Lisa Wong</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select>
                            <SelectTrigger id="priority">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input id="start-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">End Date</Label>
                          <Input id="end-date" type="date" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddActivityOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddActivityOpen(false)}>
                          Add Activity
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Timeline Header with Months */}
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col gap-0 w-28 shrink-0">
                        {/* Spacer for month headers */}
                        <div className="h-[52px]" />
                      </div>

                      {/* Timeline Grid */}
                      <div className="flex-1 min-w-0 relative">
                        {/* Month Headers */}
                        <div className="flex border-b-2 border-slate-300 pb-3 mb-4">
                          {["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"].map((month) => (
                            <div key={month} className="flex-1 text-center">
                              <div className="text-sm font-bold text-slate-900">{month.split(" ")[0]}</div>
                              <div className="text-[10px] text-slate-500 font-medium">{month.split(" ")[1]}</div>
                            </div>
                          ))}
                        </div>

                        <div className="absolute left-[15%] top-[52px] bottom-0 border-l-2 border-dashed border-slate-300 z-10 pointer-events-none">
                          <div className="absolute -top-3 -left-8 bg-slate-400 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap">
                            TODAY
                          </div>
                        </div>

                        {/* Lessor Row */}
                        <div className="mb-4 pb-4 border-b border-slate-100">
                          <div className="flex items-center gap-4 mb-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 text-blue-800 hover:from-blue-100 hover:to-blue-200 text-xs font-semibold shadow-sm w-28"
                            >
                              Lessor
                            </Button>
                            <div className="flex-1 space-y-2">
                              {activities
                                .filter((a) => a.party === "Lessor")
                                .map((activity) => (
                                  <div key={activity.id} className="relative h-12">
                                    <div
                                      onClick={() => handleActivityClick(activity.id)}
                                      className={`absolute ${
                                        activity.id === 1
                                          ? "left-[8%] w-[20%]"
                                          : activity.id === 2
                                            ? "left-[33%] w-[28%]"
                                            : activity.id === 3
                                              ? "left-[50%] w-[15%]"
                                              : "left-[68%] w-[25%]"
                                      } h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex flex-col justify-center px-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-blue-800`}
                                    >
                                      <div className="flex items-center justify-between mb-0.5">
                                        <div className="text-[10px] font-semibold text-white">{activity.name}</div>
                                        <Badge
                                          className={`text-[8px] h-3 px-1 ${
                                            activity.status === "COMPLETED"
                                              ? "bg-green-500 text-white"
                                              : activity.status === "IN PROGRESS"
                                                ? "bg-blue-400 text-white"
                                                : activity.status === "ON HOLD"
                                                  ? "bg-orange-500 text-white"
                                                  : "bg-slate-300 text-slate-700"
                                          }`}
                                        >
                                          {activity.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center justify-between text-[8px] text-blue-100">
                                        <span>
                                          {activity.startDate} - {activity.endDate}
                                        </span>
                                        <Badge
                                          className={`text-[7px] h-3 px-1 ${
                                            activity.priority === "HIGH"
                                              ? "bg-red-500 text-white"
                                              : activity.priority === "MED"
                                                ? "bg-amber-500 text-white"
                                                : "bg-slate-400 text-white"
                                          }`}
                                        >
                                          {activity.priority}
                                        </Badge>
                                      </div>
                                      <div className="text-[8px] text-blue-100 mt-0.5">{activity.assignee}</div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        {/* CAMO Row */}
                        <div className="mb-4 pb-4 border-b border-slate-100">
                          <div className="flex items-center gap-4 mb-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-300 text-emerald-800 hover:from-emerald-100 hover:to-emerald-200 text-xs font-semibold shadow-sm w-28"
                            >
                              CAMO
                            </Button>
                            <div className="flex-1 space-y-2">
                              {activities
                                .filter((a) => a.party === "CAMO")
                                .map((activity) => (
                                  <div key={activity.id} className="relative h-12">
                                    <div
                                      onClick={() => handleActivityClick(activity.id)}
                                      className={`absolute ${
                                        activity.id === 5
                                          ? "left-[0%] w-[32%]"
                                          : activity.id === 6
                                            ? "left-[28%] w-[18%]"
                                            : activity.id === 7
                                              ? "left-[50%] w-[22%]"
                                              : "left-[75%] w-[20%]"
                                      } h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-md flex flex-col justify-center px-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-emerald-800`}
                                    >
                                      <div className="flex items-center justify-between mb-0.5">
                                        <div className="text-[10px] font-semibold text-white">{activity.name}</div>
                                        <Badge
                                          className={`text-[8px] h-3 px-1 ${
                                            activity.status === "COMPLETED"
                                              ? "bg-green-500 text-white"
                                              : activity.status === "IN PROGRESS"
                                                ? "bg-blue-400 text-white"
                                                : activity.status === "ON HOLD"
                                                  ? "bg-orange-500 text-white"
                                                  : "bg-slate-300 text-slate-700"
                                          }`}
                                        >
                                          {activity.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center justify-between text-[8px] text-emerald-100">
                                        <span>
                                          {activity.startDate} - {activity.endDate}
                                        </span>
                                        <Badge
                                          className={`text-[7px] h-3 px-1 ${
                                            activity.priority === "HIGH"
                                              ? "bg-red-500 text-white"
                                              : activity.priority === "MED"
                                                ? "bg-amber-500 text-white"
                                                : "bg-slate-400 text-white"
                                          }`}
                                        >
                                          {activity.priority}
                                        </Badge>
                                      </div>
                                      <div className="text-[8px] text-emerald-100 mt-0.5">{activity.assignee}</div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>

                        {/* MRO Row */}
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300 text-amber-800 hover:from-amber-100 hover:to-amber-200 text-xs font-semibold shadow-sm w-28"
                            >
                              MRO
                            </Button>
                            <div className="flex-1 space-y-2">
                              {activities
                                .filter((a) => a.party === "MRO")
                                .map((activity) => (
                                  <div key={activity.id} className="relative h-12">
                                    <div
                                      onClick={() => handleActivityClick(activity.id)}
                                      className={`absolute ${
                                        activity.id === 9
                                          ? "left-[5%] w-[25%]"
                                          : activity.id === 10
                                            ? "left-[20%] w-[18%]"
                                            : activity.id === 11
                                              ? "left-[42%] w-[22%]"
                                              : activity.id === 12
                                                ? "left-[60%] w-[15%]"
                                                : "left-[78%] w-[20%]"
                                      } h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-md flex flex-col justify-center px-2 shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-amber-800`}
                                    >
                                      <div className="flex items-center justify-between mb-0.5">
                                        <div className="text-[10px] font-semibold text-white">{activity.name}</div>
                                        <Badge
                                          className={`text-[8px] h-3 px-1 ${
                                            activity.status === "COMPLETED"
                                              ? "bg-green-500 text-white"
                                              : activity.status === "IN PROGRESS"
                                                ? "bg-blue-400 text-white"
                                                : activity.status === "ON HOLD"
                                                  ? "bg-orange-500 text-white"
                                                  : "bg-slate-300 text-slate-700"
                                          }`}
                                        >
                                          {activity.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center justify-between text-[8px] text-amber-100">
                                        <span>
                                          {activity.startDate} - {activity.endDate}
                                        </span>
                                        <Badge
                                          className={`text-[7px] h-3 px-1 ${
                                            activity.priority === "HIGH"
                                              ? "bg-red-500 text-white"
                                              : activity.priority === "MED"
                                                ? "bg-amber-500 text-white"
                                                : "bg-slate-400 text-white"
                                          }`}
                                        >
                                          {activity.priority}
                                        </Badge>
                                      </div>
                                      <div className="text-[8px] text-amber-100 mt-0.5">{activity.assignee}</div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-slate-200 px-2">
                      <span className="text-xs font-bold text-slate-700">Legend:</span>
                      <div className="flex items-center gap-2">
                        <div className="h-3.5 w-3.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded border border-blue-800 shadow-sm"></div>
                        <span className="text-xs font-medium text-slate-700">Lessor Activities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3.5 w-3.5 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded border border-emerald-800 shadow-sm"></div>
                        <span className="text-xs font-medium text-slate-700">CAMO Activities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3.5 w-3.5 bg-gradient-to-br from-amber-600 to-amber-700 rounded border border-amber-800 shadow-sm"></div>
                        <span className="text-xs font-medium text-slate-700">MRO Activities</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900">IATA Binder</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsIATABinderOpen(!isIATABinderOpen)}
                  className="h-8 w-8 p-0 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  {isIATABinderOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 bg-transparent"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add a New Folder
                </Button>
              </div>
            </div>

            {isIATABinderOpen && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {folders.map((folder, idx) => {
                  const cardProps =
                    folder.letter === "A" ||
                    folder.letter === "B" ||
                    folder.letter === "C" ||
                    folder.letter === "D" ||
                    folder.letter === "E" ||
                    folder.letter === "H" ||
                    folder.link // Check if link exists for conditional rendering
                      ? { href: folder.link }
                      : {}

                  const CardWrapper =
                    folder.letter === "A" ||
                    folder.letter === "B" ||
                    folder.letter === "C" ||
                    folder.letter === "D" ||
                    folder.letter === "E" ||
                    folder.letter === "H" ||
                    folder.link // Check if link exists for conditional rendering
                      ? Link
                      : "div"

                  return (
                    <CardWrapper key={`${folder.letter}-${idx}`} {...cardProps}>
                      <Card className="hover:shadow-md transition-all cursor-pointer bg-white border-slate-200 h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                                  folder.color === "blue"
                                    ? "bg-blue-50 border border-blue-200"
                                    : folder.color === "emerald"
                                      ? "bg-emerald-50 border border-emerald-200"
                                      : folder.color === "violet"
                                        ? "bg-violet-50 border border-violet-200"
                                        : folder.color === "amber"
                                          ? "bg-amber-50 border border-amber-200"
                                          : folder.color === "rose"
                                            ? "bg-rose-50 border border-rose-200"
                                            : folder.color === "cyan"
                                              ? "bg-cyan-50 border border-cyan-200"
                                              : folder.color === "indigo"
                                                ? "bg-indigo-50 border border-indigo-200"
                                                : folder.color === "teal"
                                                  ? "bg-teal-50 border border-teal-200"
                                                  : folder.color === "orange"
                                                    ? "bg-orange-50 border border-orange-200"
                                                    : folder.color === "green"
                                                      ? "bg-green-50 border border-green-200"
                                                      : folder.color === "pink"
                                                        ? "bg-pink-50 border border-pink-200"
                                                        : "bg-slate-100 border border-slate-200"
                                }`}
                              >
                                <span
                                  className={`text-xl font-bold ${
                                    folder.color === "blue"
                                      ? "text-blue-700"
                                      : folder.color === "emerald"
                                        ? "text-emerald-700"
                                        : folder.color === "violet"
                                          ? "text-violet-700"
                                          : folder.color === "amber"
                                            ? "text-amber-700"
                                            : folder.color === "rose"
                                              ? "text-rose-700"
                                              : folder.color === "cyan"
                                                ? "text-cyan-700"
                                                : folder.color === "indigo"
                                                  ? "text-indigo-700"
                                                  : folder.color === "teal"
                                                    ? "text-teal-700"
                                                    : folder.color === "orange"
                                                      ? "text-orange-700"
                                                      : folder.color === "green"
                                                        ? "text-green-700"
                                                        : folder.color === "pink"
                                                          ? "text-pink-700"
                                                          : "text-slate-700"
                                  }`}
                                >
                                  {folder.letter}
                                </span>
                              </div>
                              <div>
                                <CardTitle className="text-base text-slate-900">{folder.name}</CardTitle>
                                <div className="text-xs text-slate-500 mt-1">{folder.documents} documents</div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-slate-600">Progress</span>
                              <span className="text-xs font-semibold text-slate-900">{folder.progress}%</span>
                            </div>
                            <Progress value={folder.progress} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                            <span className="text-xs text-slate-500">{folder.lastUpdate}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </CardWrapper>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Chat & Activity */}
        <div className="border-l border-slate-200 bg-slate-50 flex flex-col">
          <div className="flex border-b border-slate-200 sticky top-16 bg-slate-50 z-10">
            <button className="flex-1 px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-slate-900 bg-white">
              Chat
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">
              Activity
            </button>
          </div>

          {/* Chat Section */}
          <div className="p-4 space-y-4">
            {[
              {
                user: "Alex Kumar",
                role: "CAMO",
                message: "The AD compliance list for Folder C needs urgent attention",
                time: "2:15 PM",
                avatar: "AK",
              },
              {
                user: "Lisa Wong",
                role: "MRO",
                message: "We've completed the physical inspection. Uploading photos now.",
                time: "2:20 PM",
                avatar: "LW",
              },
              {
                user: "James Miller",
                role: "Lessor",
                message: "Can someone confirm the delivery location?",
                time: "2:45 PM",
                avatar: "JM",
              },
              {
                user: "Sarah Chen",
                role: "Operator",
                message: "Delivery will be at Frankfurt Main. Coordinates to follow.",
                time: "2:50 PM",
                avatar: "SC",
              },
            ].map((msg, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xs font-medium text-blue-600">
                    {msg.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">{msg.user}</span>
                      <Badge variant="outline" className="text-xs border-slate-300 text-slate-600">
                        {msg.role}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-500">{msg.time}</span>
                  </div>
                </div>
                <div className="ml-10 text-sm bg-white border border-slate-200 rounded-lg p-3 text-pretty text-slate-700">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-4 bg-white sticky bottom-0">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAssignFolderOpen} onOpenChange={setIsAssignFolderOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Folder {selectedFolder}</DialogTitle>
            <DialogDescription>Assign a person, party, and priority to manage this folder.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                defaultValue={selectedFolder ? folderAssignments[selectedFolder]?.assignee : undefined}
                onValueChange={(value) => {
                  if (selectedFolder) {
                    setFolderAssignments((prev) => ({
                      ...prev,
                      [selectedFolder]: { ...prev[selectedFolder], assignee: value },
                    }))
                  }
                }}
              >
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Select person" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sarah Chen">Sarah Chen</SelectItem>
                  <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                  <SelectItem value="Emily Rodriguez">Emily Rodriguez</SelectItem>
                  <SelectItem value="Alex Kumar">Alex Kumar</SelectItem>
                  <SelectItem value="Lisa Wong">Lisa Wong</SelectItem>
                  <SelectItem value="James Miller">James Miller</SelectItem>
                  <SelectItem value="Tom Stevens">Tom Stevens</SelectItem>
                  <SelectItem value="David Lee">David Lee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="party">Party / Organization</Label>
              <Select
                defaultValue={selectedFolder ? folderAssignments[selectedFolder]?.party : undefined}
                onValueChange={(value) => {
                  if (selectedFolder) {
                    setFolderAssignments((prev) => ({
                      ...prev,
                      [selectedFolder]: { ...prev[selectedFolder], party: value },
                    }))
                  }
                }}
              >
                <SelectTrigger id="party">
                  <SelectValue placeholder="Select party" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lessor">Lessor</SelectItem>
                  <SelectItem value="Operator">Operator</SelectItem>
                  <SelectItem value="MRO">MRO</SelectItem>
                  <SelectItem value="CAMO">CAMO</SelectItem>
                  <SelectItem value="OEM">OEM</SelectItem>
                  <SelectItem value="Third Party">Third Party</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                defaultValue={selectedFolder ? folderAssignments[selectedFolder]?.priority : undefined}
                onValueChange={(value) => {
                  if (selectedFolder) {
                    setFolderAssignments((prev) => ({
                      ...prev,
                      [selectedFolder]: { ...prev[selectedFolder], priority: value },
                    }))
                  }
                }}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAssignFolderOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAssignFolderOpen(false)}>
              Save Assignment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditActivityOpen} onOpenChange={setIsEditActivityOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
            <DialogDescription>Update the activity details including dates, status, and priority.</DialogDescription>
          </DialogHeader>
          {currentActivity && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      currentActivity.party === "Lessor"
                        ? "border-blue-300 text-blue-700 bg-blue-50"
                        : currentActivity.party === "CAMO"
                          ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                          : "border-amber-300 text-amber-700 bg-amber-50"
                    }`}
                  >
                    {currentActivity.party}
                  </Badge>
                  <span className="text-sm font-semibold text-slate-900">{currentActivity.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span>{currentActivity.assignee}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-start-date">Start Date</Label>
                <Input
                  id="edit-start-date"
                  type="text"
                  value={currentActivity.startDate}
                  onChange={(e) => {
                    setActivities((prev) =>
                      prev.map((a) => (a.id === currentActivity.id ? { ...a, startDate: e.target.value } : a)),
                    )
                  }}
                  placeholder="e.g., Oct 1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-end-date">End Date</Label>
                <Input
                  id="edit-end-date"
                  type="text"
                  value={currentActivity.endDate}
                  onChange={(e) => {
                    setActivities((prev) =>
                      prev.map((a) => (a.id === currentActivity.id ? { ...a, endDate: e.target.value } : a)),
                    )
                  }}
                  placeholder="e.g., Oct 15"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-assignee">Assignee</Label>
                <Select
                  value={currentActivity.assignee}
                  onValueChange={(value) => {
                    setActivities((prev) =>
                      prev.map((a) => (a.id === currentActivity.id ? { ...a, assignee: value } : a)),
                    )
                  }}
                >
                  <SelectTrigger id="edit-assignee">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sarah C.">Sarah C.</SelectItem>
                    <SelectItem value="Mike J.">Mike J.</SelectItem>
                    <SelectItem value="Emily R.">Emily R.</SelectItem>
                    <SelectItem value="Alex K.">Alex K.</SelectItem>
                    <SelectItem value="Lisa W.">Lisa W.</SelectItem>
                    <SelectItem value="James M.">James M.</SelectItem>
                    <SelectItem value="Tom S.">Tom S.</SelectItem>
                    <SelectItem value="David L.">David L.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={currentActivity.status}
                  onValueChange={(value) => {
                    setActivities((prev) =>
                      prev.map((a) => (a.id === currentActivity.id ? { ...a, status: value } : a)),
                    )
                  }}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN PROGRESS">In Progress</SelectItem>
                    <SelectItem value="ON HOLD">On Hold</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select
                  value={currentActivity.priority}
                  onValueChange={(value) => {
                    setActivities((prev) =>
                      prev.map((a) => (a.id === currentActivity.id ? { ...a, priority: value } : a)),
                    )
                  }}
                >
                  <SelectTrigger id="edit-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="MED">Medium</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditActivityOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditActivityOpen(false)}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
