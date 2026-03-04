"use client"

import React from "react"

import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  Download,
  ChevronRight,
  Settings,
  Calendar,
  Clock,
  MessageSquare,
  TrendingUp,
  FileText,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Mockup5() {
  const [selectedFolder, setSelectedFolder] = React.useState("K")

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top Bar */}
      <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-6">
            <div>
              <h1 className="font-bold">ATR 72-600 Redelivery</h1>
              <div className="text-xs text-muted-foreground">MSN: 1289 • Registry: F-WWEY</div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Delivery: Apr 15, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="font-semibold text-accent">172 days</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Binder
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-b border-border bg-card/50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium">Active Project</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Progress:</span>
              <Progress value={64} className="w-32 h-2" />
              <span className="font-medium text-foreground">64%</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>8 Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-primary" />
              <span>3 In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span>1 Overdue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Split Screen Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane - Binder Navigation */}
        <div className="w-96 border-r border-border bg-card flex flex-col">
          <div className="h-14 border-b border-border px-4 flex items-center justify-between">
            <h2 className="font-semibold">IATA Delivery Binder</h2>
            <Badge variant="outline">11 Folders</Badge>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {[
                {
                  id: "A",
                  name: "General Information",
                  progress: 100,
                  priority: "high",
                  subfolders: 5,
                  status: "complete",
                },
                {
                  id: "B",
                  name: "Technical Records",
                  progress: 75,
                  priority: "high",
                  subfolders: 8,
                  status: "in-progress",
                },
                {
                  id: "C",
                  name: "Airworthiness Directives",
                  progress: 55,
                  priority: "high",
                  subfolders: 6,
                  status: "in-progress",
                },
                {
                  id: "D",
                  name: "Service Bulletins",
                  progress: 40,
                  priority: "medium",
                  subfolders: 4,
                  status: "in-progress",
                },
                { id: "E", name: "Modifications", progress: 85, priority: "high", subfolders: 7, status: "complete" },
                { id: "F", name: "Repairs", progress: 70, priority: "medium", subfolders: 3, status: "in-progress" },
                { id: "G", name: "Inspections", progress: 95, priority: "high", subfolders: 9, status: "complete" },
                {
                  id: "H",
                  name: "Component Records",
                  progress: 45,
                  priority: "medium",
                  subfolders: 12,
                  status: "in-progress",
                },
                { id: "I", name: "Engine Records", progress: 80, priority: "high", subfolders: 6, status: "complete" },
                { id: "J", name: "APU Records", progress: 60, priority: "low", subfolders: 4, status: "in-progress" },
                {
                  id: "K",
                  name: "Landing Gear",
                  progress: 50,
                  priority: "medium",
                  subfolders: 5,
                  status: "in-progress",
                },
              ].map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    selectedFolder === folder.id
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-secondary/30 hover:bg-secondary/50 border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          folder.status === "complete" ? "bg-accent/20" : "bg-primary/20"
                        }`}
                      >
                        <span
                          className={`font-mono font-bold ${
                            folder.status === "complete" ? "text-accent" : "text-primary"
                          }`}
                        >
                          {folder.id}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-sm text-pretty">{folder.name}</div>
                        <div className="text-xs text-muted-foreground">{folder.subfolders} subfolders</div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${
                        selectedFolder === folder.id ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <Badge
                        variant={
                          folder.priority === "high"
                            ? "destructive"
                            : folder.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {folder.priority}
                      </Badge>
                      <span className="font-medium">{folder.progress}%</span>
                    </div>
                    <Progress value={folder.progress} className="h-2" />
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Pane - Dynamic Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Folder Details Header */}
          <div className="border-b border-border bg-card px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Folder {selectedFolder} - Landing Gear</h2>
                <p className="text-sm text-muted-foreground">5 subfolders • 18 documents • Last updated 4 hours ago</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Assign Users
                </Button>
                <Button variant="outline" size="sm">
                  Set Priority
                </Button>
                <Button size="sm">Add Documents</Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content - 2 columns */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Subfolders */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Subfolders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { name: "Main Landing Gear", docs: 6, progress: 65, assignee: "MRO" },
                          { name: "Nose Landing Gear", docs: 4, progress: 55, assignee: "MRO" },
                          { name: "LG Overhaul Records", docs: 3, progress: 40, assignee: "CAMO" },
                          { name: "Brake System", docs: 3, progress: 50, assignee: "Operator" },
                          { name: "Tire & Wheel Assembly", docs: 2, progress: 45, assignee: "MRO" },
                        ].map((subfolder, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{subfolder.name}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {subfolder.assignee}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>{subfolder.docs} documents</span>
                              <span>{subfolder.progress}%</span>
                            </div>
                            <Progress value={subfolder.progress} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Timeline for this folder */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Folder Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { event: "Folder created", date: "Oct 28, 2025", user: "System" },
                          { event: "Assigned to MRO team", date: "Oct 29, 2025", user: "Admin" },
                          { event: "Main LG inspection report uploaded", date: "Nov 3, 2025", user: "MRO Team" },
                          { event: "Brake system docs requested", date: "Nov 8, 2025", user: "CAMO" },
                          { event: "Overhaul records pending review", date: "Nov 12, 2025", user: "Lessor" },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                            <div className="flex-1">
                              <div className="font-medium">{item.event}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.date} • {item.user}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-6">
                  {/* Folder Chat */}
                  <Card className="flex flex-col h-96">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Folder Discussion
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <ScrollArea className="flex-1 pr-3">
                        <div className="space-y-3">
                          {[
                            {
                              user: "MRO Team",
                              message: "Main LG inspection completed, uploading detailed report now",
                              time: "3h ago",
                            },
                            { user: "CAMO", message: "Need brake system maintenance records ASAP", time: "2h ago" },
                            { user: "Lessor", message: "Overhaul records are critical for redelivery", time: "1h ago" },
                          ].map((msg, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">{msg.user}</span>
                                <span className="text-xs text-muted-foreground">{msg.time}</span>
                              </div>
                              <div className="text-xs bg-secondary/50 rounded-lg p-2 text-pretty">{msg.message}</div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          placeholder="Comment..."
                          className="flex-1 px-2 py-1.5 bg-secondary rounded text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button size="sm" className="h-7 text-xs">
                          Send
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Folder Stats */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Folder Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Documents</span>
                        <span className="font-bold">18</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Completed</span>
                        <span className="font-bold text-accent">9</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pending</span>
                        <span className="font-bold text-primary">9</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Assigned To</span>
                        <span className="font-bold">MRO Team</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
