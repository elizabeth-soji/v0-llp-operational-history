"use client"

import type React from "react"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Upload,
  Download,
  ChevronLeft,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  FileText,
  ArrowUpDown,
  Folder,
  Settings,
} from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Sample OC/CM components data
const ocCmComponents = [
  {
    itemNumber: 1,
    mpdReference: "321-49-00-01",
    nomenclature: "FUEL PUMP",
    partNumber: "9012-45601-12",
    serialNumber: "FP8821456",
    position: "FT1",
    assignee: "MRO",
    status: "In Progress",
  },
  {
    itemNumber: 2,
    mpdReference: "321-49-00-02",
    nomenclature: "HYDRAULIC PUMP",
    partNumber: "9012-45602-08",
    serialNumber: "HP9921789",
    position: "HY2",
    assignee: "CAMO",
    status: "Completed",
  },
  {
    itemNumber: 3,
    mpdReference: "321-29-01-01",
    nomenclature: "FLIGHT CONTROL COMPUTER",
    partNumber: "9012-29101-05",
    serialNumber: "FCC112233",
    position: "EC1",
    assignee: "MRO",
    status: "In Progress",
  },
  {
    itemNumber: 4,
    mpdReference: "321-24-00-01",
    nomenclature: "GENERATOR",
    partNumber: "9012-24001-15",
    serialNumber: "GEN445566",
    position: "EL1",
    assignee: "Lessor",
    status: "Pending",
  },
  {
    itemNumber: 5,
    mpdReference: "321-21-00-01",
    nomenclature: "AIR CONDITIONING PACK",
    partNumber: "9012-21001-09",
    serialNumber: "AC7788991",
    position: "AC1",
    assignee: "MRO",
    status: "Completed",
  },
  {
    itemNumber: 6,
    mpdReference: "321-32-00-01",
    nomenclature: "LANDING GEAR ACTUATOR",
    partNumber: "9012-32001-11",
    serialNumber: "LG3344556",
    position: "LG1",
    assignee: "CAMO",
    status: "In Progress",
  },
]

// Sample hard time components data
const hardTimeComponents = [
  {
    itemNumber: 1,
    mpdReference: "213100-08-1",
    nomenclature: "VALVE-SAFETY",
    partNumber: "9024-15704-03",
    serialNumber: "111154866",
    position: "HL",
    assignee: "MRO",
    status: "In Progress",
  },
  {
    itemNumber: 2,
    mpdReference: "213100-08-1",
    nomenclature: "VALVE-SAFETY",
    partNumber: "9024-15704-21",
    serialNumber: "21153917",
    position: "HL",
    assignee: "MRO",
    status: "In Progress",
  },
  {
    itemNumber: 3,
    mpdReference: "215141-01-1",
    nomenclature: "FILTER-OZONE",
    partNumber: "204990061",
    serialNumber: "1676100",
    position: "HM",
    assignee: "CAMO",
    status: "Pending",
  },
  {
    itemNumber: 4,
    mpdReference: "215141-01-1",
    nomenclature: "FILTER-OZONE",
    partNumber: "204990061",
    serialNumber: "3701101",
    position: "HM",
    assignee: "CAMO",
    status: "Completed",
  },
  {
    itemNumber: 5,
    mpdReference: "215200-01-1",
    nomenclature: "HEAT EXCHANGER",
    partNumber: "753D0000-01",
    serialNumber: "81211-7124510",
    position: "HM6",
    assignee: "MRO",
    status: "In Progress",
  },
  {
    itemNumber: 6,
    mpdReference: "215200-01-1",
    nomenclature: "HEAT EXCHANGER",
    partNumber: "754C0000-01",
    serialNumber: "81212-5646910",
    position: "HM6",
    assignee: "MRO",
    status: "Completed",
  },
]

export default function ComponentsPage({ params }: { params: Promise<{ subId: string }> }) {
  const { subId } = use(params)
  const isOcCm = subId?.toLowerCase() === "h002"
  const componentsData = isOcCm ? ocCmComponents : hardTimeComponents
  const pageTitle = isOcCm ? "On Condition / Condition Monitored Components" : "Hard Time Components"
  const breadcrumbTitle = isOcCm ? "H002. OC/CM Components" : "H001. Hard Time Components"
  const reportName = isOcCm ? "OC/CM Components Report" : "HT Components Report"

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredComponents, setFilteredComponents] = useState(componentsData)
  const [chatName, setChatName] = useState("Team Chat")
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>(["John Doe", "Sarah Miller", "Mike Johnson"])

  const availableUsers = [
    "John Doe",
    "Sarah Miller",
    "Mike Johnson",
    "Emily Rodriguez",
    "David Chen",
    "Lisa Anderson",
    "Tom Wilson",
  ]

  const handleSearch = () => {
    const query = searchQuery.toLowerCase()
    const filtered = componentsData.filter(
      (component) =>
        component.serialNumber.toLowerCase().includes(query) ||
        component.partNumber.toLowerCase().includes(query) ||
        component.nomenclature.toLowerCase().includes(query),
    )
    setFilteredComponents(filtered)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Real-time search
    if (value === "") {
      setFilteredComponents(componentsData)
    } else {
      const query = value.toLowerCase()
      const filtered = componentsData.filter(
        (component) =>
          component.serialNumber.toLowerCase().includes(query) ||
          component.partNumber.toLowerCase().includes(query) ||
          component.nomenclature.toLowerCase().includes(query),
      )
      setFilteredComponents(filtered)
    }
  }

  // Calculate statistics
  const totalComponents = componentsData.length
  const completedComponents = componentsData.filter((c) => c.status === "Completed").length
  const inProgressComponents = componentsData.filter((c) => c.status === "In Progress").length
  const pendingComponents = componentsData.filter((c) => c.status === "Pending").length
  const completionPercentage = Math.round((completedComponents / totalComponents) * 100)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAssigneeColor = (assignee: string) => {
    switch (assignee) {
      case "MRO":
        return "bg-purple-100 text-purple-800"
      case "CAMO":
        return "bg-cyan-100 text-cyan-800"
      case "Lessor":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleToggleUser = (user: string) => {
    setSelectedUsers((prev) => (prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]))
  }

  const handleSaveChatSettings = () => {
    setIsChatDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/mockup-2">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Link href="/mockup-2" className="hover:text-gray-900">
                  IATA Binder
                </Link>
                <span>/</span>
                <Link href="/mockup-2/folder/h" className="hover:text-gray-900">
                  H. Component Records
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{breadcrumbTitle}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Folder className="h-4 w-4 mr-2" />
                AI Record Management System
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {reportName}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Project Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="px-6 py-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">EFW A321-200 P2F Redelivery</h1>
            <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
              <span>
                MSN: <span className="font-semibold text-gray-900">7382</span>
              </span>
              <span>
                Registry: <span className="font-semibold text-gray-900">JA112A</span>
              </span>
              <span>
                Delivery: <span className="font-semibold text-gray-900">25/11/2025</span>
              </span>
              <span className="text-amber-600 font-semibold">T-31 days</span>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Overall Progress:</span>
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "68%" }} />
                </div>
                <span className="text-sm font-semibold text-gray-900">68%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[300px_1fr_350px] gap-6 p-6">
        {/* Left Sidebar - Progress Dashboard */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Completed</span>
                  </div>
                  <span className="text-lg font-bold text-green-700">{completedComponents}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">In Progress</span>
                  </div>
                  <span className="text-lg font-bold text-blue-700">{inProgressComponents}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Total</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{totalComponents}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{completionPercentage}%</div>
                  <div className="text-sm text-gray-600">Completion</div>
                </div>
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Content - Components Table */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{pageTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search Bar */}
              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by serial number, part number, or description..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Components Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          <div className="flex items-center gap-1">
                            Item #
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          MPD Reference
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Nomenclature
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Part Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Serial Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Assignee
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredComponents.map((component) => (
                        <tr key={component.itemNumber} className="hover:bg-gray-50 transition-colors cursor-pointer">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            <Link
                              href={`/mockup-2/folder/h/subfolder/${subId}/part/${component.itemNumber}`}
                              className="block"
                            >
                              {component.itemNumber}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                            <Link
                              href={`/mockup-2/folder/h/subfolder/${subId}/part/${component.itemNumber}`}
                              className="block"
                            >
                              {component.mpdReference}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            <Link
                              href={`/mockup-2/folder/h/subfolder/${subId}/part/${component.itemNumber}`}
                              className="block"
                            >
                              {component.nomenclature}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                            <Link
                              href={`/mockup-2/folder/h/subfolder/${subId}/part/${component.itemNumber}`}
                              className="block"
                            >
                              {component.partNumber}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                            <Link
                              href={`/mockup-2/folder/h/subfolder/${subId}/part/${component.itemNumber}`}
                              className="block"
                            >
                              {component.serialNumber}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 font-semibold">
                            <Link
                              href={`/mockup-2/folder/h/subfolder/${subId}/part/${component.itemNumber}`}
                              className="block"
                            >
                              {component.position}
                            </Link>
                          </td>
                          <td className="px-4 py-3">
                            <Link
                              href={`/mockup-2/folder/h/subfolder/${subId}/part/${component.itemNumber}`}
                              className="block"
                            >
                              <Badge variant="outline" className={getAssigneeColor(component.assignee)}>
                                {component.assignee}
                              </Badge>
                            </Link>
                          </td>
                          <td className="px-4 py-3">
                            <Link
                              href={`/mockup-2/folder/h/subfolder/${subId}/part/${component.itemNumber}`}
                              className="block"
                            >
                              <Badge variant="outline" className={getStatusColor(component.status)}>
                                {component.status}
                              </Badge>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {filteredComponents.length === 0 && (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No components found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Chat & Activity */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{chatName}</CardTitle>
                <Dialog open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Chat Settings</DialogTitle>
                      <DialogDescription>Modify chat name and manage team members</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="chat-name">Chat Name</Label>
                        <Input
                          id="chat-name"
                          value={chatName}
                          onChange={(e) => setChatName(e.target.value)}
                          placeholder="Enter chat name"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Team Members</Label>
                          <Badge variant="outline" className="text-xs">
                            {selectedUsers.length} selected
                          </Badge>
                        </div>
                        <div className="border border-gray-200 rounded-lg max-h-[300px] overflow-y-auto">
                          {availableUsers.map((user) => (
                            <div
                              key={user}
                              className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                    {user
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-gray-900">{user}</span>
                              </div>
                              <Checkbox
                                checked={selectedUsers.includes(user)}
                                onCheckedChange={() => handleToggleUser(user)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsChatDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveChatSettings}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4 max-h-[300px] overflow-y-auto">
                {selectedUsers.map((user) => (
                  <div key={user} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                        {user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{user}</span>
                        <span className="text-xs text-gray-500">10:30 AM</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {isOcCm
                          ? "Fuel pump condition monitoring completed"
                          : "Heat exchanger cleaning completed for position HM6"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input placeholder="Type a message..." className="flex-1" />
                <Button size="icon" variant="outline">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">
                      {isOcCm ? "Component #5 completed" : "Component #6 completed"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isOcCm ? "Air conditioning pack monitoring" : "Heat exchanger cleaning"} - 2 hours ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">
                      {isOcCm ? "Component #3 in progress" : "Component #5 in progress"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isOcCm ? "Flight control computer check" : "Heat exchanger cleaning"} - 3 hours ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">
                      {isOcCm ? "Component #2 completed" : "Component #1 in progress"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isOcCm ? "Hydraulic pump inspection" : "Valve safety overhaul"} - 5 hours ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-amber-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">
                      {isOcCm ? "Component #4 pending" : "Component #8 pending"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isOcCm ? "Generator condition check" : "Heat exchanger cleaning"} - 1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
