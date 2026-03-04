import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  Download,
  ChevronDown,
  ChevronRight,
  Calendar,
  Clock,
  TrendingUp,
  FileText,
  Users,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Mockup4() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-card">
        <div className="h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-lg font-bold">Bombardier CRJ900 Redelivery</h1>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>MSN: 15234</span>
                <span>•</span>
                <span>Registry: C-GKEJ</span>
                <span>•</span>
                <span>Delivery: Feb 28, 2026</span>
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
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Dashboard Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Days to Delivery</div>
                  <div className="text-3xl font-bold text-accent">126</div>
                </div>
                <Clock className="h-10 w-10 text-accent/20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Overall Progress</div>
                  <div className="text-3xl font-bold">52%</div>
                </div>
                <TrendingUp className="h-10 w-10 text-primary/20" />
              </div>
              <Progress value={52} className="mt-3 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Pending Tasks</div>
                  <div className="text-3xl font-bold">18</div>
                </div>
                <FileText className="h-10 w-10 text-muted-foreground/20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Team Members</div>
                  <div className="text-3xl font-bold">12</div>
                </div>
                <Users className="h-10 w-10 text-muted-foreground/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Binder & Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Collapsible Binder */}
            <Card>
              <CardHeader className="cursor-pointer hover:bg-secondary/30 transition-colors">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ChevronDown className="h-5 w-5" />
                    IATA Delivery Binder (A-K)
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">6/11 Complete</span>
                    <Progress value={55} className="w-24 h-2" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  {[
                    { id: "A", name: "General Information", progress: 95, status: "complete" },
                    { id: "B", name: "Technical Records", progress: 70, status: "in-progress" },
                    { id: "C", name: "Airworthiness Directives", progress: 50, status: "in-progress" },
                    { id: "D", name: "Service Bulletins", progress: 40, status: "in-progress" },
                    { id: "E", name: "Modifications", progress: 80, status: "complete" },
                    { id: "F", name: "Repairs", progress: 60, status: "in-progress" },
                    { id: "G", name: "Inspections", progress: 90, status: "complete" },
                    { id: "H", name: "Component Records", progress: 30, status: "pending" },
                    { id: "I", name: "Engine Records", progress: 75, status: "complete" },
                    { id: "J", name: "APU Records", progress: 55, status: "in-progress" },
                    { id: "K", name: "Landing Gear", progress: 45, status: "in-progress" },
                  ].map((folder) => (
                    <button
                      key={folder.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left group"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-mono font-bold text-primary">{folder.id}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium mb-1 text-pretty">{folder.name}</div>
                        <Progress value={folder.progress} className="h-1" />
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Project Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Horizontal timeline */}
                  <div className="relative">
                    <div className="flex justify-between mb-2 text-xs text-muted-foreground">
                      <span>Oct 2025</span>
                      <span>Dec 2025</span>
                      <span>Feb 2026</span>
                    </div>
                    <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-accent rounded-full" style={{ width: "52%" }} />
                    </div>
                    <div
                      className="absolute top-0 bg-primary h-4 w-1 rounded-full"
                      style={{ left: "52%", transform: "translateX(-50%)" }}
                    />
                  </div>

                  {/* Party assignments */}
                  <div className="space-y-3 mt-6">
                    {[
                      { party: "CAMO", tasks: "Documentation Review & Compliance", progress: 75, color: "bg-blue-500" },
                      { party: "MRO", tasks: "Physical Inspection & Testing", progress: 60, color: "bg-green-500" },
                      { party: "Operator", tasks: "Records Compilation", progress: 45, color: "bg-purple-500" },
                      { party: "Lessor", tasks: "Review & Approval", progress: 30, color: "bg-orange-500" },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${item.color}`} />
                            <span className="text-sm font-medium">{item.party}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.progress}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground ml-5">{item.tasks}</div>
                        <Progress value={item.progress} className="h-1.5 ml-5" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tasks, Activity, Chat */}
          <div className="space-y-6">
            {/* What to Do Next */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What to Do Next</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3 pr-4">
                    {[
                      {
                        task: "Complete Folder C AD compliance review",
                        due: "Today",
                        priority: "high",
                        assignee: "CAMO",
                      },
                      { task: "Upload component logs to Folder H", due: "Today", priority: "high", assignee: "MRO" },
                      {
                        task: "Verify engine maintenance records",
                        due: "Tomorrow",
                        priority: "high",
                        assignee: "Operator",
                      },
                      {
                        task: "Review Folder E modifications",
                        due: "In 2 days",
                        priority: "medium",
                        assignee: "Lessor",
                      },
                      { task: "Update Folder J APU records", due: "In 3 days", priority: "medium", assignee: "MRO" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border" />
                          <div className="flex-1 text-sm font-medium text-pretty">{item.task}</div>
                        </div>
                        <div className="flex items-center gap-2 ml-6">
                          <Badge variant="outline" className="text-xs">
                            {item.assignee}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Due: {item.due}</span>
                          {item.priority === "high" && <AlertCircle className="h-3 w-3 text-destructive" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-3 pr-4">
                    {[
                      { user: "David Kim", action: "uploaded 4 documents to Folder B", time: "10 min ago" },
                      { user: "Sophie Martin", action: "completed Folder G inspection", time: "45 min ago" },
                      { user: "Robert Chen", action: "commented on Folder E", time: "1 hour ago" },
                      { user: "Lisa Anderson", action: "assigned Folder H to MRO", time: "2 hours ago" },
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium flex-shrink-0">
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div>
                            <span className="font-medium">{activity.user}</span>{" "}
                            <span className="text-muted-foreground">{activity.action}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Team Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-3">
                  {[
                    { user: "DK", message: "Folder B updates are ready for review", time: "10m" },
                    { user: "SM", message: "Great work on Folder G!", time: "45m" },
                  ].map((msg, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {msg.user}
                        </div>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <div className="ml-8 bg-secondary/50 rounded-lg p-2 text-pretty">{msg.message}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="sm">Send</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
