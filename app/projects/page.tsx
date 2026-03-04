"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Plane, AlertTriangle, CheckCircle2, Clock, Filter, Calendar, User, FileText, TrendingUp, Target } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts"
import { Notifications } from "@/components/notifications"

// Sample projects data
const projectsData = [
  {
    id: "1",
    name: "EFW A321-200 P2F Redelivery",
    msn: "7382",
    registration: "JA112A",
    aircraftType: "A321-200",
    projectManager: "Sarah Chen",
    deliveryDate: "2025-11-25",
    daysToDelivery: 31,
    status: "on-track",
    progress: 68,
    totalFolders: 11,
    completedFolders: 7,
    atRiskItems: 3,
  },
  {
    id: "2",
    name: "Boeing 737-800 Lease Return",
    msn: "5421",
    registration: "N8234B",
    aircraftType: "B737-800",
    projectManager: "Michael Torres",
    deliveryDate: "2025-12-15",
    daysToDelivery: 51,
    status: "at-risk",
    progress: 45,
    totalFolders: 11,
    completedFolders: 5,
    atRiskItems: 8,
  },
  {
    id: "3",
    name: "A320neo Redelivery Project",
    msn: "9876",
    registration: "D-AXYZ",
    aircraftType: "A320neo",
    projectManager: "Emma Wilson",
    deliveryDate: "2026-01-10",
    daysToDelivery: 77,
    status: "on-track",
    progress: 82,
    totalFolders: 11,
    completedFolders: 9,
    atRiskItems: 1,
  },
  {
    id: "4",
    name: "B777-300ER End of Lease",
    msn: "3344",
    registration: "G-VXYZ",
    aircraftType: "B777-300ER",
    projectManager: "David Kim",
    deliveryDate: "2025-10-30",
    daysToDelivery: 5,
    status: "delayed",
    progress: 72,
    totalFolders: 11,
    completedFolders: 8,
    atRiskItems: 12,
  },
  {
    id: "5",
    name: "A330-300 Transition Check",
    msn: "1567",
    registration: "F-HABC",
    aircraftType: "A330-300",
    projectManager: "Sarah Chen",
    deliveryDate: "2026-02-20",
    daysToDelivery: 118,
    status: "on-track",
    progress: 34,
    totalFolders: 11,
    completedFolders: 4,
    atRiskItems: 2,
  },
  {
    id: "6",
    name: "B787-9 Redelivery",
    msn: "8899",
    registration: "JA890A",
    aircraftType: "B787-9",
    projectManager: "Michael Torres",
    deliveryDate: "2025-11-05",
    daysToDelivery: 11,
    status: "at-risk",
    progress: 88,
    totalFolders: 11,
    completedFolders: 10,
    atRiskItems: 6,
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [aircraftTypeFilter, setAircraftTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("delivery-asc")

  // Calculate dashboard metrics
  const totalProjects = projectsData.length
  const onTrackProjects = projectsData.filter((p) => p.status === "on-track").length
  const atRiskProjects = projectsData.filter((p) => p.status === "at-risk").length
  const delayedProjects = projectsData.filter((p) => p.status === "delayed").length
  const avgProgress = Math.round(projectsData.reduce((sum, p) => sum + p.progress, 0) / totalProjects)
  const urgentDeliveries = projectsData.filter((p) => p.daysToDelivery <= 14).length

  const statusData = [
    {
      name: "On Track",
      value: onTrackProjects,
      color: "#22c55e", // Using more vibrant green color
      percentage: Math.round((onTrackProjects / totalProjects) * 100),
    },
    {
      name: "At Risk",
      value: atRiskProjects,
      color: "#f59e0b", // Using more vibrant amber color
      percentage: Math.round((atRiskProjects / totalProjects) * 100),
    },
    {
      name: "Delayed",
      value: delayedProjects,
      color: "#ef4444", // Using more vibrant red color
      percentage: Math.round((delayedProjects / totalProjects) * 100),
    },
  ]

  const radialData = [
    { name: "Completion", value: avgProgress, fill: "#0ea5e9" },
    { name: "On Track", value: Math.round((onTrackProjects / totalProjects) * 100), fill: "#22c55e" },
    { name: "At Risk", value: Math.round((atRiskProjects / totalProjects) * 100), fill: "#f59e0b" },
  ]

  // Filter and sort projects
  let filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.msn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.aircraftType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectManager.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesAircraftType = aircraftTypeFilter === "all" || project.aircraftType === aircraftTypeFilter

    return matchesSearch && matchesStatus && matchesAircraftType
  })

  // Sort projects
  filteredProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "delivery-asc":
        return a.daysToDelivery - b.daysToDelivery
      case "delivery-desc":
        return b.daysToDelivery - a.daysToDelivery
      case "progress-asc":
        return a.progress - b.progress
      case "progress-desc":
        return b.progress - a.progress
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "at-risk":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "delayed":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle2 className="h-4 w-4" />
      case "at-risk":
        return <AlertTriangle className="h-4 w-4" />
      case "delayed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl shadow-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Aircraft Projects Dashboard
                </h1>
                <p className="text-sm text-gray-500">Real-time fleet redelivery management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Notifications />
              <Link href="/projects/create">
                <Button className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Wagon Wheel Status Chart */}
          <Card className="lg:col-span-1 border-gray-200 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Target className="h-5 w-5 text-sky-600" />
                Fleet Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="#fff"
                      strokeWidth={3}
                      isAnimationActive={true}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={3} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-4xl font-bold text-gray-900">{totalProjects}</div>
                  <div className="text-sm text-gray-500">Total Projects</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {statusData.map((item, index) => (
                  <div key={index} className="text-center p-2 rounded-lg bg-white border border-gray-200">
                    <div className="text-2xl font-bold" style={{ color: item.color }}>
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{item.name}</div>
                    <div className="text-xs font-semibold text-gray-900 mt-1">{item.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Radial Progress Metrics */}
          <Card className="lg:col-span-1 border-gray-200 shadow-lg bg-gradient-to-br from-white to-sky-50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-sky-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="20%"
                  outerRadius="90%"
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between p-2 rounded-lg bg-sky-50 border border-sky-200">
                  <span className="text-sm text-gray-700">Avg Completion</span>
                  <span className="text-lg font-bold text-sky-600">{avgProgress}%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="text-sm text-gray-700">On Track Rate</span>
                  <span className="text-lg font-bold text-emerald-600">
                    {Math.round((onTrackProjects / totalProjects) * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="text-sm text-gray-700">Risk Rate</span>
                  <span className="text-lg font-bold text-amber-600">
                    {Math.round((atRiskProjects / totalProjects) * 100)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics Cards */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-4">
            <Card className="border-emerald-200 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-700">{onTrackProjects}</div>
                    <div className="text-xs text-emerald-600 font-medium">On Track</div>
                  </div>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{ width: `${(onTrackProjects / totalProjects) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-700">{atRiskProjects}</div>
                    <div className="text-xs text-amber-600 font-medium">At Risk</div>
                  </div>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-amber-600 h-2 rounded-full"
                    style={{ width: `${(atRiskProjects / totalProjects) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-700">{delayedProjects}</div>
                    <div className="text-xs text-red-600 font-medium">Delayed</div>
                  </div>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${(delayedProjects / totalProjects) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-700">{urgentDeliveries}</div>
                    <div className="text-xs text-purple-600 font-medium">Urgent</div>
                  </div>
                </div>
                <div className="text-xs text-purple-600 mt-3">≤14 days to delivery</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 border-gray-200 shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by MSN, registration, aircraft type, project name, or manager..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[180px] border-gray-300">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="on-track">On Track</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={aircraftTypeFilter} onValueChange={setAircraftTypeFilter}>
                <SelectTrigger className="w-full lg:w-[180px] border-gray-300">
                  <Plane className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Aircraft Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="A321-200">A321-200</SelectItem>
                  <SelectItem value="B737-800">B737-800</SelectItem>
                  <SelectItem value="A320neo">A320neo</SelectItem>
                  <SelectItem value="B777-300ER">B777-300ER</SelectItem>
                  <SelectItem value="A330-300">A330-300</SelectItem>
                  <SelectItem value="B787-9">B787-9</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[200px] border-gray-300">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery-asc">Soonest Delivery</SelectItem>
                  <SelectItem value="delivery-desc">Latest Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Link key={project.id} href="/mockup-2">
              <Card className="border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors mb-1">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-mono">{project.aircraftType}</span>
                        <span>•</span>
                        <span className="font-mono">MSN {project.msn}</span>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(project.status)} flex items-center gap-1`}>
                      {getStatusIcon(project.status)}
                      {project.status === "on-track"
                        ? "On Track"
                        : project.status === "at-risk"
                          ? "At Risk"
                          : "Delayed"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Registration and Delivery */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Registration</p>
                        <p className="font-mono font-medium text-gray-900">{project.registration}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Delivery Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(project.deliveryDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Days to Delivery */}
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                        project.daysToDelivery <= 14
                          ? "bg-red-50 border border-red-200"
                          : project.daysToDelivery <= 30
                            ? "bg-amber-50 border border-amber-200"
                            : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <Clock
                        className={`h-4 w-4 ${
                          project.daysToDelivery <= 14
                            ? "text-red-600"
                            : project.daysToDelivery <= 30
                              ? "text-amber-600"
                              : "text-gray-600"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          project.daysToDelivery <= 14
                            ? "text-red-700"
                            : project.daysToDelivery <= 30
                              ? "text-amber-700"
                              : "text-gray-700"
                        }`}
                      >
                        {project.status === "delayed" ? "T+" : "T-"}
                        {Math.abs(project.daysToDelivery)} days
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">Overall Progress</span>
                        <span className="font-semibold text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            project.progress >= 80
                              ? "bg-emerald-500"
                              : project.progress >= 50
                                ? "bg-sky-500"
                                : "bg-amber-500"
                          }`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Folder Status */}
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {project.completedFolders}/{project.totalFolders} Folders
                        </span>
                      </div>
                      {project.atRiskItems > 0 && (
                        <div className="flex items-center gap-1 text-amber-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">{project.atRiskItems} at risk</span>
                        </div>
                      )}
                    </div>

                    {/* Project Manager */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-200">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{project.projectManager}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="border-gray-200">
            <CardContent className="py-12 text-center">
              <Plane className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
