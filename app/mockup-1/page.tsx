import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  Download,
  ChevronRight,
  MessageSquare,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Circle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Mockup1() {
  const binderFolders = [
    { id: "A", name: "General Information", progress: 85, priority: "high", subfolders: 5 },
    { id: "B", name: "Technical Records", progress: 60, priority: "high", subfolders: 8 },
    { id: "C", name: "Airworthiness Directives", progress: 45, priority: "medium", subfolders: 6 },
    { id: "D", name: "Service Bulletins", progress: 30, priority: "medium", subfolders: 4 },
    { id: "E", name: "Modifications", progress: 70, priority: "high", subfolders: 7 },
    { id: "F", name: "Repairs", progress: 55, priority: "low", subfolders: 3 },
    { id: "G", name: "Inspections", progress: 90, priority: "high", subfolders: 9 },
    { id: "H", name: "Component Records", progress: 40, priority: "medium", subfolders: 12 },
    { id: "I", name: "Engine Records", progress: 75, priority: "high", subfolders: 6 },
    { id: "J", name: "APU Records", progress: 65, priority: "medium", subfolders: 4 },
    { id: "K", name: "Landing Gear", progress: 50, priority: "low", subfolders: 5 },
  ]

  const activities = [
    { user: "Sarah Chen", action: "uploaded document to Folder B", time: "5 min ago" },
    { user: "Mike Johnson", action: "completed Folder G review", time: "23 min ago" },
    { user: "Emma Davis", action: "commented on Folder E", time: "1 hour ago" },
    { user: "Tom Wilson", action: "assigned Folder D to MRO team", time: "2 hours ago" },
  ]

  const todos = [
    { task: "Complete Folder C documentation", due: "Today", priority: "high", assignee: "CAMO" },
    { task: "Review Folder H component logs", due: "Tomorrow", priority: "high", assignee: "MRO" },
    { task: "Upload Folder D service bulletins", due: "In 2 days", priority: "medium", assignee: "Operator" },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - IATA Binder Structure */}
      <div className="w-80 border-r border-border bg-card">
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <h2 className="font-semibold">IATA Delivery Binder</h2>
          <Button size="sm" variant="ghost">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-4 space-y-2">
            {binderFolders.map((folder) => (
              <Card key={folder.id} className="cursor-pointer transition-all hover:border-primary">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-primary">{folder.id}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Badge
                      variant={
                        folder.priority === "high"
                          ? "destructive"
                          : folder.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {folder.priority}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium mb-2 text-pretty">{folder.name}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{folder.subfolders} subfolders</span>
                      <span>{folder.progress}%</span>
                    </div>
                    <Progress value={folder.progress} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
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
                <div className="text-xs text-muted-foreground">Project</div>
                <div className="font-semibold">Boeing 737-800 Redelivery</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">MSN</div>
                <div className="font-mono">38745</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Registry</div>
                <div className="font-mono">N8374B</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Delivery Date</div>
                <div>Dec 15, 2025</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Time Remaining</div>
                <div className="font-semibold text-accent">52 days</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Binder
            </Button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="border-b border-border bg-card px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-medium">In Progress</span>
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress: 62%</div>
              <Progress value={62} className="w-48 h-2" />
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>7 Complete</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-muted-foreground" />
                <span>4 Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span>2 Overdue</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Timeline Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Project Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-2" />
                    {[
                      {
                        party: "CAMO",
                        task: "Initial Documentation Review",
                        date: "Oct 24 - Nov 5",
                        status: "completed",
                      },
                      { party: "MRO", task: "Physical Inspection", date: "Nov 6 - Nov 20", status: "in-progress" },
                      {
                        party: "Operator",
                        task: "Records Compilation",
                        date: "Nov 10 - Nov 25",
                        status: "in-progress",
                      },
                      { party: "Lessor", task: "Final Review & Approval", date: "Nov 26 - Dec 10", status: "pending" },
                      {
                        party: "All Parties",
                        task: "Delivery Preparation",
                        date: "Dec 11 - Dec 15",
                        status: "pending",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="relative pl-8 pb-6">
                        <div
                          className={`absolute left-0 h-5 w-5 rounded-full border-2 border-background ${
                            item.status === "completed"
                              ? "bg-accent"
                              : item.status === "in-progress"
                                ? "bg-primary"
                                : "bg-muted"
                          }`}
                        />
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{item.task}</div>
                            <div className="text-sm text-muted-foreground">{item.party}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">{item.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What to Do Next */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  What to Do Next
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todos.map((todo, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                      <Circle className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-pretty">{todo.task}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {todo.assignee}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{todo.due}</span>
                        </div>
                      </div>
                      <Badge variant={todo.priority === "high" ? "destructive" : "secondary"}>{todo.priority}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-medium">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">{activity.action}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Chat */}
      <div className="w-96 border-l border-border bg-card flex flex-col">
        <div className="h-16 border-b border-border px-4 flex items-center justify-between">
          <h2 className="font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Project Chat
          </h2>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {[
              {
                user: "Sarah Chen",
                message: "The engine records in Folder I need verification from MRO",
                time: "10:30 AM",
              },
              { user: "Mike Johnson", message: "Confirmed. We'll have those reviewed by EOD", time: "10:35 AM" },
              { user: "Emma Davis", message: "Folder G inspection reports are now complete", time: "11:20 AM" },
            ].map((msg, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <div className="text-sm bg-secondary/50 rounded-lg p-3 text-pretty">{msg.message}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="sm">Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
