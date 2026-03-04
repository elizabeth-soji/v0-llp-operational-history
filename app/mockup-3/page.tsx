import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  Download,
  FolderOpen,
  Calendar,
  Activity,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Mockup3() {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-bold">Embraer E190 End-of-Lease</h1>
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

        {/* Project Info Cards */}
        <div className="px-6 py-4 border-t border-border">
          <div className="grid grid-cols-6 gap-4">
            <Card className="bg-secondary/30">
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground mb-1">MSN</div>
                <div className="font-mono font-semibold">19000567</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30">
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground mb-1">Registry</div>
                <div className="font-mono font-semibold">PR-AXM</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30">
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground mb-1">Delivery Date</div>
                <div className="font-semibold">Mar 30, 2026</div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30">
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground mb-1">Days Remaining</div>
                <div className="font-semibold text-accent flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  157
                </div>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30">
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground mb-1">Status</div>
                <Badge className="bg-accent text-accent-foreground">Active</Badge>
              </CardContent>
            </Card>
            <Card className="bg-secondary/30">
              <CardContent className="pt-4 pb-3">
                <div className="text-xs text-muted-foreground mb-1">Progress</div>
                <div className="flex items-center gap-2">
                  <Progress value={47} className="h-2 flex-1" />
                  <span className="text-sm font-semibold">47%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="binder" className="h-full flex flex-col">
          <div className="border-b border-border bg-card px-6">
            <TabsList className="bg-transparent h-12">
              <TabsTrigger value="binder" className="gap-2">
                <FolderOpen className="h-4 w-4" />
                Delivery Binder
              </TabsTrigger>
              <TabsTrigger value="timeline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Activity className="h-4 w-4" />
                Activity & Chat
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto">
            {/* Binder Tab */}
            <TabsContent value="binder" className="h-full m-0 p-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Binder Folders */}
                <div className="lg:col-span-2 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>IATA Binder Structure (A-K)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2">
                        {[
                          { id: "A", name: "General Information", progress: 90, priority: "high", docs: 12 },
                          { id: "B", name: "Technical Records", progress: 65, priority: "high", docs: 34 },
                          { id: "C", name: "Airworthiness Directives", progress: 40, priority: "high", docs: 18 },
                          { id: "D", name: "Service Bulletins", progress: 55, priority: "medium", docs: 22 },
                          { id: "E", name: "Modifications", progress: 75, priority: "high", docs: 15 },
                          { id: "F", name: "Repairs", progress: 50, priority: "medium", docs: 9 },
                          { id: "G", name: "Inspections", progress: 85, priority: "high", docs: 28 },
                          { id: "H", name: "Component Records", progress: 35, priority: "medium", docs: 41 },
                          { id: "I", name: "Engine Records", progress: 70, priority: "high", docs: 19 },
                          { id: "J", name: "APU Records", progress: 60, priority: "low", docs: 11 },
                          { id: "K", name: "Landing Gear", progress: 45, priority: "medium", docs: 14 },
                        ].map((folder) => (
                          <Card key={folder.id} className="cursor-pointer hover:border-primary transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <span className="font-mono font-bold text-primary">{folder.id}</span>
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm text-pretty">{folder.name}</div>
                                    <div className="text-xs text-muted-foreground">{folder.docs} documents</div>
                                  </div>
                                </div>
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
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium">{folder.progress}%</span>
                                </div>
                                <Progress value={folder.progress} className="h-2" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions & Stats */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Documents</span>
                        <span className="text-2xl font-bold">223</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Completed Folders</span>
                        <span className="text-2xl font-bold">5/11</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Pending Reviews</span>
                        <span className="text-2xl font-bold text-destructive">8</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Priority Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { task: "Complete Folder C review", due: "Today" },
                        { task: "Upload Folder H docs", due: "Tomorrow" },
                        { task: "Verify Folder I records", due: "In 2 days" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                          <div className="flex-1">
                            <div className="font-medium text-pretty">{item.task}</div>
                            <div className="text-xs text-muted-foreground">Due: {item.due}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="h-full m-0 p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline & Party Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Timeline visualization */}
                    <div className="relative pl-8">
                      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
                      {[
                        {
                          phase: "Initial Assessment",
                          party: "CAMO",
                          date: "Oct 24 - Nov 10",
                          status: "completed",
                          tasks: ["Documentation review", "Compliance check"],
                        },
                        {
                          phase: "Physical Inspection",
                          party: "MRO",
                          date: "Nov 11 - Dec 5",
                          status: "in-progress",
                          tasks: ["Aircraft inspection", "Component testing"],
                        },
                        {
                          phase: "Records Compilation",
                          party: "Operator",
                          date: "Nov 15 - Dec 20",
                          status: "in-progress",
                          tasks: ["Gather maintenance logs", "Compile flight records"],
                        },
                        {
                          phase: "Technical Review",
                          party: "Lessor",
                          date: "Dec 21 - Jan 15",
                          status: "pending",
                          tasks: ["Review all documentation", "Approve modifications"],
                        },
                        {
                          phase: "Final Preparation",
                          party: "All Parties",
                          date: "Jan 16 - Mar 30",
                          status: "pending",
                          tasks: ["Final checks", "Delivery coordination"],
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="relative pb-8">
                          <div
                            className={`absolute left-[-1.75rem] h-4 w-4 rounded-full border-2 border-background ${
                              item.status === "completed"
                                ? "bg-accent"
                                : item.status === "in-progress"
                                  ? "bg-primary"
                                  : "bg-muted"
                            }`}
                          />
                          <Card className={item.status === "in-progress" ? "border-primary" : ""}>
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold">{item.phase}</h3>
                                  <p className="text-sm text-muted-foreground">{item.date}</p>
                                </div>
                                <Badge variant="outline">{item.party}</Badge>
                              </div>
                              <ul className="space-y-1 mt-3">
                                {item.tasks.map((task, taskIdx) => (
                                  <li key={taskIdx} className="text-sm flex items-center gap-2">
                                    <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity & Chat Tab */}
            <TabsContent value="activity" className="h-full m-0 p-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Chat */}
                <Card className="flex flex-col h-[calc(100vh-16rem)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Project Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-4">
                        {[
                          {
                            user: "Carlos Silva",
                            role: "CAMO",
                            message: "Folder C needs immediate attention. Several ADs are expiring soon.",
                            time: "9:15 AM",
                          },
                          {
                            user: "Maria Santos",
                            role: "MRO",
                            message: "Physical inspection of landing gear completed. Photos uploaded to Folder K.",
                            time: "10:30 AM",
                          },
                          {
                            user: "John Peterson",
                            role: "Lessor",
                            message: "Can we schedule a call to discuss the timeline?",
                            time: "11:45 AM",
                          },
                          {
                            user: "Ana Rodriguez",
                            role: "Operator",
                            message: "All flight records have been compiled and are ready for review.",
                            time: "1:20 PM",
                          },
                        ].map((msg, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                                {msg.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{msg.user}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {msg.role}
                                  </Badge>
                                </div>
                                <span className="text-xs text-muted-foreground">{msg.time}</span>
                              </div>
                            </div>
                            <div className="ml-10 text-sm bg-secondary/50 rounded-lg p-3 text-pretty">
                              {msg.message}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button size="sm">Send</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[calc(100vh-20rem)]">
                      <div className="space-y-4">
                        {[
                          {
                            user: "Carlos Silva",
                            action: "uploaded 3 documents to Folder C",
                            time: "5 minutes ago",
                            type: "upload",
                          },
                          {
                            user: "Maria Santos",
                            action: "completed Folder K inspection",
                            time: "1 hour ago",
                            type: "complete",
                          },
                          {
                            user: "John Peterson",
                            action: "commented on Folder E",
                            time: "2 hours ago",
                            type: "comment",
                          },
                          {
                            user: "Ana Rodriguez",
                            action: "assigned Folder H to MRO team",
                            time: "3 hours ago",
                            type: "assign",
                          },
                          {
                            user: "Carlos Silva",
                            action: "updated priority for Folder C",
                            time: "4 hours ago",
                            type: "update",
                          },
                          {
                            user: "Maria Santos",
                            action: "uploaded 5 documents to Folder B",
                            time: "5 hours ago",
                            type: "upload",
                          },
                          { user: "John Peterson", action: "approved Folder A", time: "6 hours ago", type: "approve" },
                        ].map((activity, idx) => (
                          <div key={idx} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
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
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
